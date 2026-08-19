import { useEffect, useState, useRef } from "react";
import { useFetcher, useLoaderData, useParams, useRevalidator } from "react-router";
import { useAppBridge } from "@shopify/app-bridge-react";
import { boundary } from "@shopify/shopify-app-react-router/server";
import { authenticate } from "../shopify.server";
import { getGroup, updateGroup, deleteGroup, duplicateGroup } from "../schema.server";

export const loader = async ({ request, params }) => {
  await authenticate.admin(request);
  const { session } = await authenticate.admin(request);
  const group = await getGroup(session.shop, params.slug);
  if (!group) {
    throw new Response("Not Found", { status: 404 });
  }
  return { group };
};

export const action = async ({ request, params }) => {
  await authenticate.admin(request);
  const { session } = await authenticate.admin(request);
  const formData = await request.formData();
  const action = formData.get("action");

  if (action === "update") {
    const name = formData.get("name")?.toString().trim() || "";
    const slug = formData.get("slug")?.toString().trim() || "";
    if (!name || !slug) {
      return { error: "Name and slug are required" };
    }
    await updateGroup(session.shop, params.slug, { name, slug });
    return { success: true };
  }

  if (action === "delete") {
    await deleteGroup(session.shop, params.slug);
    return { success: true, redirect: "/app/all-schemas" };
  }

  if (action === "duplicate") {
    await duplicateGroup(session.shop, params.slug);
    return { success: true, redirect: "/app/all-schemas" };
  }

  return { error: "Invalid action" };
};

export default function EditSchemaGroup() {
  const fetcher = useFetcher();
  const shopify = useAppBridge();
  const revalidator = useRevalidator();
  const params = useParams();
  const loaderData = useLoaderData();
  const group = loaderData?.group;

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [notice, setNotice] = useState(null);
  const processedRef = useRef(null);

  useEffect(() => {
    if (group) {
      setName(group.name);
      setSlug(group.slug);
    }
  }, [group]);

  useEffect(() => {
    const dataKey = JSON.stringify(fetcher.data);
    if (processedRef.current === dataKey) return;
    processedRef.current = dataKey;

    if (fetcher.data?.success) {
      shopify.toast.show("Action completed successfully");
      setNotice({ type: "success", message: "Action completed successfully" });
      revalidator.revalidate();
      setTimeout(() => setNotice(null), 3000);
    }
    if (fetcher.data?.error) {
      shopify.toast.show(fetcher.data.error);
      setNotice({ type: "error", message: fetcher.data.error });
      setTimeout(() => setNotice(null), 3000);
    }
  }, [fetcher.data, shopify, revalidator]);

  const handleUpdate = () => {
    const fd = new FormData();
    fd.append("action", "update");
    fd.append("name", name);
    fd.append("slug", slug);
    fetcher.submit(fd, { method: "post" });
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${group?.name}"? This action cannot be undone.`)) {
      const fd = new FormData();
      fd.append("action", "delete");
      fetcher.submit(fd, { method: "post" });
    }
  };

  const handleDuplicate = () => {
    const fd = new FormData();
    fd.append("action", "duplicate");
    fetcher.submit(fd, { method: "post" });
  };

  return (
    <s-page heading="Edit Schema Group">
      {notice && (
        <s-banner
          tone={notice.type === "error" ? "critical" : "success"}
          onDismiss={() => setNotice(null)}
          style={{ marginBottom: "16px" }}
        >
          {notice.message}
        </s-banner>
      )}

      <s-section heading="Group Details">
        <s-stack direction="block" gap="base">
          <s-text-field
            label="Group Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="off"
          />
          <s-text-field
            label="Group Slug"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            autoComplete="off"
          />
          <s-stack direction="inline" gap="base">
            <s-button variant="primary" onClick={handleUpdate}>
              Save Changes
            </s-button>
            <s-button onClick={handleDuplicate}>
              Duplicate
            </s-button>
            <s-button tone="critical" onClick={handleDelete}>
              Delete
            </s-button>
            <s-link href="/app/all-schemas" target="_self">
              Back to Manage Schemas
            </s-link>
          </s-stack>
        </s-stack>
      </s-section>

      {group && (
        <s-section heading={`Schemas in this group (${group.schemas?.length || 0})`}>
          <s-stack direction="block" gap="base">
            {group.schemas && group.schemas.length > 0 ? (
              <s-table className="schema-table-3col">
                <s-table-header-row>
                  <s-table-header>Type</s-table-header>
                  <s-table-header>Name</s-table-header>
                  <s-table-header>Mode</s-table-header>
                </s-table-header-row>
                <s-table-body>
                  {group.schemas.map((s) => (
                    <s-table-row key={s.id}>
                      <s-table-cell>{s.type}</s-table-cell>
                      <s-table-cell>{s.name}</s-table-cell>
                      <s-table-cell>{s.mode}</s-table-cell>
                    </s-table-row>
                  ))}
                </s-table-body>
              </s-table>
            ) : (
              <s-paragraph>No schemas in this group yet.</s-paragraph>
            )}
          </s-stack>
        </s-section>
      )}
    </s-page>
  );
}

export const headers = (headersArgs) => {
  return boundary.headers(headersArgs);
};

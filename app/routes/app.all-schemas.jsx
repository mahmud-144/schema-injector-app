import { useEffect, useState, useRef } from "react";
import { useFetcher, useLoaderData, useRevalidator, useNavigate } from "react-router";
import { useAppBridge } from "@shopify/app-bridge-react";
import { boundary } from "@shopify/shopify-app-react-router/server";
import { authenticate } from "../shopify.server";
import { getGroups, deleteGroup, duplicateGroup } from "../schema.server";

export const loader = async ({ request }) => {
  await authenticate.admin(request);
  const { session } = await authenticate.admin(request);
  const groups = await getGroups(session.shop);
  return { groups };
};

export const action = async ({ request }) => {
  await authenticate.admin(request);
  const { session } = await authenticate.admin(request);
  const formData = await request.formData();
  const action = formData.get("action");

  if (action === "delete") {
    const slug = formData.get("slug");
    await deleteGroup(session.shop, slug);
    return { success: true };
  }

  if (action === "duplicate") {
    const slug = formData.get("slug");
    await duplicateGroup(session.shop, slug);
    return { success: true };
  }

  return { error: "Invalid action" };
};

export default function ManageSchemas() {
  const fetcher = useFetcher();
  const shopify = useAppBridge();
  const revalidator = useRevalidator();
  const navigate = useNavigate();
  const loaderData = useLoaderData();
  const groups = loaderData?.groups || [];

  const [search, setSearch] = useState("");
  const [notice, setNotice] = useState(null);
  const [copiedSlug, setCopiedSlug] = useState(null);
  const processedRef = useRef(null);

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

  useEffect(() => {
    const handleFocus = () => {
      revalidator.revalidate();
    };
    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, [revalidator]);

  const filteredGroups = groups.filter((g) =>
    g.name.toLowerCase().includes(search.toLowerCase()) ||
    g.slug.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (slug, name) => {
    if (window.confirm(`Are you sure you want to delete "${name}"? This action cannot be undone.`)) {
      const fd = new FormData();
      fd.append("action", "delete");
      fd.append("slug", slug);
      fetcher.submit(fd, { method: "post" });
    }
  };

  const handleDuplicate = (slug) => {
    const fd = new FormData();
    fd.append("action", "duplicate");
    fd.append("slug", slug);
    fetcher.submit(fd, { method: "post" });
  };

  const handleCopy = async (slug) => {
    const snippet = `{% render 'ultimate-schema', group: '${slug}' %}`;
    if (navigator?.clipboard) {
      await navigator.clipboard.writeText(snippet);
      setCopiedSlug(slug);
      setTimeout(() => setCopiedSlug(null), 2000);
    }
  };

  return (
    <s-page
      heading="Manage Schemas"
      primaryAction={
        <s-button variant="primary" onClick={() => navigate("/app/all-schemas/create")}>
          Create Schema Group
        </s-button>
      }
    >
      {notice && (
        <s-banner
          tone={notice.type === "error" ? "critical" : "success"}
          onDismiss={() => setNotice(null)}
          style={{ marginBottom: "16px" }}
        >
          {notice.message}
        </s-banner>
      )}

      <s-section heading="Manage Schemas">
        <s-paragraph>
          Create, edit, and delete your schema groups. Each group can be used as a standalone schema or injected into multiple pages.
        </s-paragraph>
      </s-section>

      <s-section>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h2 style={{ margin: 0 }}>{`${groups.length} Total schema groups`}</h2>
          <s-button variant="primary" onClick={() => navigate("/app/all-schemas/create")}>
            Add New Schema
          </s-button>
        </div>
        <s-stack direction="block" gap="base">
          <s-text-field
            label="Search schemas"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or slug..."
            autoComplete="off"
          />

          {filteredGroups.length > 0 ? (
              <s-table className="schema-table-5col">
                <s-table-header-row>
                  <s-table-header>Group Name</s-table-header>
                  <s-table-header>Total Schemas</s-table-header>
                  <s-table-header>Injection Type</s-table-header>
                  <s-table-header>Usage</s-table-header>
                  <s-table-header>Manage</s-table-header>
                </s-table-header-row>
              <s-table-body>
                {filteredGroups.map((g) => (
                  <s-table-row key={g.id}>
                    <s-table-cell>
                      <s-link href={`/app/all-schemas/${g.slug}`} target="_self">
                        {g.name}
                      </s-link>
                    </s-table-cell>
                    <s-table-cell>{g.schemas?.length || 0}</s-table-cell>
                    <s-table-cell>
                      {g.targets && g.targets.length > 0
                        ? g.targets[0].injectType || "None"
                        : "None"}
                    </s-table-cell>
                      <s-table-cell>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', maxWidth: '260px' }}>
                          <code 
                            title={`{% render 'ultimate-schema', group: '${g.slug}' %}`}
                            style={{ 
                              flex: 1, 
                              maxWidth: '220px',
                              background: '#f6f6f7', 
                              padding: '6px 8px', 
                              borderRadius: '4px', 
                              fontSize: '12px', 
                              whiteSpace: 'nowrap', 
                              overflow: 'hidden', 
                              textOverflow: 'ellipsis' 
                            }}
                          >
                            {`{% render 'ultimate-schema', group: '${g.slug}' %}`}
                          </code>
                          <s-button variant="secondary" onClick={() => handleCopy(g.slug)}>
                            {copiedSlug === g.slug ? 'Copied!' : 'Copy'}
                          </s-button>
                        </div>
                      </s-table-cell>
                    <s-table-cell>
                      <s-stack direction="inline" gap="base" alignItems="center">
                        <s-link href={`/app?edit=${g.slug}`} target="_self">
                          Edit
                        </s-link>
                        <s-button onClick={() => handleDuplicate(g.slug)}>
                          Duplicate
                        </s-button>
                        <s-button
                          tone="critical"
                          onClick={() => handleDelete(g.slug, g.name)}
                        >
                          Delete
                        </s-button>
                      </s-stack>
                    </s-table-cell>
                  </s-table-row>
                ))}
              </s-table-body>
            </s-table>
          ) : (
            <s-paragraph>
              {search ? "No schema groups match your search." : "No schema groups found. Create your first group from the Home page."}
            </s-paragraph>
          )}
        </s-stack>
      </s-section>
    </s-page>
  );
}

export const headers = (headersArgs) => {
  return boundary.headers(headersArgs);
};

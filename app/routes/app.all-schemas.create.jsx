import { useState, useEffect, useRef } from "react";
import { useFetcher, useNavigate, useSearchParams } from "react-router";
import { useAppBridge } from "@shopify/app-bridge-react";
import { boundary } from "@shopify/shopify-app-react-router/server";
import { authenticate } from "../shopify.server";
import { createGroup, saveTargets, generateShortcode } from "../schema.server";

export const loader = async ({ request }) => {
  await authenticate.admin(request);
  return null;
};

export const action = async ({ request }) => {
  await authenticate.admin(request);
  const { session } = await authenticate.admin(request);
  const formData = await request.formData();
  const action = formData.get("action");

  if (action === "createGroup") {
    const name = formData.get("groupName")?.toString().trim() || "";
    if (!name) return { error: "Group name is required" };
    const slug = (formData.get("slug")?.toString().trim() || "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
    const group = await createGroup(session.shop, name, slug);
    const injectType = formData.get("injectType")?.toString() || "";
    const targetIds = formData.get("targetIds")?.toString() || "";
    if (injectType && targetIds) {
      const pageIds = injectType === "page" || injectType === "product" || injectType === "collection" ? targetIds : "";
      const postIds = injectType === "article" ? targetIds : "";
      await saveTargets(group.id, injectType, pageIds, postIds);
    }
    const shortcode = await generateShortcode(session.shop, group);
    return { success: true, group, shortcode };
  }

  if (action === "saveTarget") {
    const groupId = formData.get("groupId")?.toString() || "";
    const injectType = formData.get("injectType")?.toString() || "";
    const pageIds = formData.get("pageIds")?.toString() || "";
    const postIds = formData.get("postIds")?.toString() || "";
    await saveTargets(groupId, injectType, pageIds, postIds);
    return { success: true };
  }

  return { error: "Invalid action" };
};

export default function CreateSchemaGroup() {
  const fetcher = useFetcher();
  const navigate = useNavigate();
  const shopify = useAppBridge();
  const [searchParams] = useSearchParams();
  const [groupName, setGroupName] = useState("");
  const [slug, setSlug] = useState("");
  const [injectType, setInjectType] = useState("shortcode");
  const [targetIds, setTargetIds] = useState("");
  const [notice, setNotice] = useState(null);
  const processedRef = useRef(null);

  useEffect(() => {
    const targetType = searchParams.get("targetType");
    const targetId = searchParams.get("targetId");
    const targetTitle = searchParams.get("targetTitle");

    if (targetType && targetId) {
      const mappedInjectType =
        targetType === "product"
          ? "product"
          : targetType === "page"
          ? "page"
          : targetType === "article"
          ? "article"
          : null;

      if (mappedInjectType) {
        setInjectType(mappedInjectType);
        setTargetIds(targetId);
      }

      const defaultName = targetTitle ? `Schema - ${targetTitle}` : "";
      if (defaultName) {
        setGroupName(defaultName);
        const autoSlug = defaultName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
        setSlug(autoSlug);
      }
    } else {
      setGroupName("");
      setSlug("");
      setInjectType("shortcode");
      setTargetIds("");
    }
    setNotice(null);
    processedRef.current = null;
  }, [searchParams]);

  useEffect(() => {
    const dataKey = JSON.stringify(fetcher.data);
    if (processedRef.current === dataKey) return;
    processedRef.current = dataKey;

    if (fetcher.data?.success && fetcher.data?.group) {
      shopify.toast.show("Schema group created successfully");
      setNotice({ type: "success", message: "Schema group created successfully." });
      setTimeout(() => {
        setNotice(null);
        navigate(`/app?edit=${fetcher.data.group.slug}`);
      }, 1200);
    }
    if (fetcher.data?.error) {
      shopify.toast.show(fetcher.data.error);
      setNotice({ type: "error", message: fetcher.data.error });
      setTimeout(() => setNotice(null), 3000);
    }
  }, [fetcher.data, shopify, navigate]);

  const handleNameChange = (e) => {
    const value = e.target.value;
    setGroupName(value);
    const autoSlug = value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
    setSlug(autoSlug);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!groupName.trim()) {
      shopify.toast.show("Please enter a schema group name");
      return;
    }
    const fd = new FormData();
    fd.append("action", "createGroup");
    fd.append("groupName", groupName.trim());
    fd.append("slug", slug.trim());
    if (injectType && targetIds.trim()) {
      fd.append("injectType", injectType);
      fd.append("targetIds", targetIds.trim());
    }
    fetcher.submit(fd, { method: "post" });
  };

  return (
    <s-page heading="Create Schema Group">
      {notice && (
        <s-banner
          tone={notice.type === "error" ? "critical" : "success"}
          onDismiss={() => setNotice(null)}
          style={{ marginBottom: "16px" }}
        >
          {notice.message}
        </s-banner>
      )}

      <s-section heading="New Schema Group">
        <s-stack direction="block" gap="base">
          <s-paragraph>
            Create a new schema group to organize your structured data. You can add schemas and configure injection targets after creation.
          </s-paragraph>

          <fetcher.Form method="post" onSubmit={handleSubmit}>
            <s-stack direction="block" gap="base">
              <s-text-field
                label="Schema Group Name"
                name="groupName"
                value={groupName}
                onChange={handleNameChange}
                placeholder="e.g., Product Schemas, FAQ Group"
                autoComplete="off"
                required
              />

              <s-text-field
                label="Slug"
                name="slug"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="auto-generated-from-name"
                autoComplete="off"
                helpText="Used for Liquid snippet: {% render 'ultimate-schema', group: 'slug' %}"
              />

              <s-select
                label="Default Injection Type"
                name="injectType"
                value={injectType}
                onChange={(e) => setInjectType(e.target.value)}
              >
                <s-option value="shortcode">Shortcode</s-option>
                <s-option value="product">Product Pages</s-option>
                <s-option value="collection">Collection Pages</s-option>
                <s-option value="page">Pages</s-option>
                <s-option value="article">Blog Posts</s-option>
              </s-select>

              <s-text-field
                label="Target IDs (optional, comma separated)"
                name="targetIds"
                value={targetIds}
                onChange={(e) => setTargetIds(e.target.value)}
                placeholder="123, 456, 789"
                autoComplete="off"
                helpText="Only required if Injection Type is not Shortcode"
              />

              <s-stack direction="inline" gap="base">
                <s-button variant="primary" type="submit">
                  Create Group
                </s-button>
                <s-link href="/app/all-schemas" target="_self">
                  <s-button>Cancel</s-button>
                </s-link>
              </s-stack>
            </s-stack>
          </fetcher.Form>
        </s-stack>
      </s-section>
    </s-page>
  );
}

export const headers = (headersArgs) => {
  return boundary.headers(headersArgs);
};

import { useState, useEffect } from "react";
import { useFetcher, useLoaderData, useSearchParams } from "react-router";
import { useAppBridge } from "@shopify/app-bridge-react";
import { boundary } from "@shopify/shopify-app-react-router/server";
import { authenticate } from "../shopify.server";
import prisma from "../db.server";
import {
  getGroupByName,
  getGroup,
  createGroup,
  saveTargets,
  saveSchemas,
  updateGroup,
  toggleGroupActive,
  deleteGroup,
  writeSchemaMetafields,
  deleteSchemaMetafields,
  getShopGid,
} from "../schema.server";

function getThemeEditorDeepLink(shop) {
  if (!shop) return null;
  const shopHandle = shop.replace(".myshopify.com", "");
  return `https://admin.shopify.com/store/${shopHandle}/themes/current/editor?context=apps`;
}

export const loader = async ({ request }) => {
  await authenticate.admin(request);
  const { session } = await authenticate.admin(request);
  const url = new URL(request.url);
  const editSlug = url.searchParams.get("edit");
  if (editSlug) {
    const group = await getGroup(session.shop, editSlug);
    return { shop: session.shop, editGroup: group };
  }
  return { shop: session.shop };
};

export const action = async ({ request }) => {
  const { session, admin } = await authenticate.admin(request);
  const formData = await request.formData();
  const actionType = formData.get("action");

  if (actionType === "createOrLoadGroup") {
    const name = formData.get("groupName")?.toString().trim() || "";
    if (!name) return { error: "Group name is required" };
    const existing = await getGroupByName(session.shop, name);
    if (existing) {
      return { group: existing, message: `Group "${name}" already exists. Loaded.` };
    }
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
    const group = await createGroup(session.shop, name, slug);
    return { group, message: `Group "${name}" created.` };
  }

  if (actionType === "loadGroupByName") {
    const name = formData.get("groupName")?.toString().trim() || "";
    if (!name) return { error: "Group name is required" };
    const group = await getGroupByName(session.shop, name);
    if (!group) return { error: `Group "${name}" not found.` };
    return { group, message: `Group "${name}" loaded.` };
  }

  if (actionType === "fetchResources") {
    const resourceType = formData.get("resourceType")?.toString() || "";
    const searchQuery = formData.get("query")?.toString().trim() || "";

    const queries = {
      pages: `query getPages($first: Int!, $query: String) {
        pages(first: $first, query: $query) {
          edges {
            node {
              id
              title
              handle
              createdAt
            }
          }
        }
      }`,
      products: `query getProducts($first: Int!, $query: String) {
        products(first: $first, query: $query) {
          edges {
            node {
              id
              title
              handle
              featuredImage {
                url
                altText
              }
              priceRangeV2 {
                minVariantPrice {
                  amount
                  currencyCode
                }
              }
            }
          }
        }
      }`,
      blogs: `query getArticles($first: Int!, $query: String) {
        articles(first: $first, query: $query) {
          edges {
            node {
              id
              title
              handle
              blog {
                handle
              }
              createdAt
            }
          }
        }
      }`,
    };

    const query = queries[resourceType];
    if (!query) return { error: "Invalid resource type" };

    try {
      const response = await admin.graphql(query, {
        variables: { first: 50, query: searchQuery || null },
      });
      const json = await response.json();

      if (json.errors) {
        console.error("Shopify API Error:", JSON.stringify(json.errors, null, 2));
        return { error: "Shopify API Error: " + (json.errors[0]?.message || "Unknown error") };
      }

      let items = [];
      const toNumericId = (gid) => {
        if (!gid || typeof gid !== "string") return gid;
        const parts = gid.split("/");
        return parts[parts.length - 1] || gid;
      };
      if (resourceType === "pages" && json.data?.pages?.edges) {
        items = json.data.pages.edges.map((e) => ({
          id: toNumericId(e.node.id),
          title: e.node.title || e.node.handle || e.node.id,
          url: `/pages/${e.node.handle || e.node.id}`,
          date: e.node.createdAt,
        }));
      } else if (resourceType === "products" && json.data?.products?.edges) {
        items = json.data.products.edges.map((e) => ({
          id: toNumericId(e.node.id),
          title: e.node.title || e.node.handle || e.node.id,
          imageUrl: e.node.featuredImage?.url || "",
          price: e.node.priceRangeV2?.minVariantPrice
            ? `${e.node.priceRangeV2.minVariantPrice.currencyCode} ${e.node.priceRangeV2.minVariantPrice.amount}`
            : "",
        }));
      } else if (resourceType === "blogs" && json.data?.articles?.edges) {
        items = json.data.articles.edges.map((e) => ({
          id: toNumericId(e.node.id),
          title: e.node.title || e.node.handle || e.node.id,
          url: `/blogs/${e.node.blog?.handle || 'blog'}/${e.node.handle || e.node.id}`,
          date: e.node.createdAt,
        }));
      }
      return { resources: items };
    } catch (err) {
      console.error("Fetch resources error:", err);
      return { error: "Failed to fetch resources: " + (err.message || err) };
    }
  }

  if (actionType === "saveTarget") {
    const groupId = formData.get("groupId")?.toString() || "";
    const injectType = formData.get("injectType")?.toString() || "";
    const selectedIds = formData.get("selectedIds")?.toString() || "";
    await saveTargets(groupId, injectType, selectedIds, "");
    return { success: true, message: "Injection target saved successfully." };
  }

  if (actionType === "saveGroup") {
    const groupId = formData.get("groupId")?.toString() || "";
    const isActiveValue = formData.get("isActive")?.toString() === "1";
    const schemasJson = formData.get("schemas")?.toString() || "[]";
    const schemas = JSON.parse(schemasJson);

    const group = await prisma.schemaGroup.findFirst({ where: { id: groupId } });
    if (!group) return { error: "Group not found" };

    await updateGroup(session.shop, group.slug, { isActive: isActiveValue });
    await saveSchemas(groupId, schemas);

    const updatedGroup = await getGroup(session.shop, group.slug);
    await writeSchemaMetafields(admin, session.shop, updatedGroup);

    return { group: updatedGroup, message: "Schema saved successfully!" };
  }

  if (actionType === "toggleActive") {
    const groupId = formData.get("groupId")?.toString() || "";
    const isActiveValue = formData.get("isActive")?.toString() === "1";

    const group = await prisma.schemaGroup.findFirst({ where: { id: groupId } });
    if (!group) return { error: "Group not found" };

    await toggleGroupActive(session.shop, group.slug, isActiveValue);
    const updatedGroup = await getGroup(session.shop, group.slug);
    await writeSchemaMetafields(admin, session.shop, updatedGroup);
    return { group: updatedGroup, message: isActiveValue ? "Schema activated." : "Schema deactivated." };
  }

  if (actionType === "deleteGroup") {
    const groupId = formData.get("groupId")?.toString() || "";

    const group = await prisma.schemaGroup.findFirst({ where: { id: groupId } });
    if (!group) return { error: "Group not found" };

    const shopGid = await getShopGid(admin);
    if (shopGid) {
      await deleteSchemaMetafields(admin, shopGid, group.slug);
    }
    await deleteGroup(session.shop, group.slug);
    return { success: true, message: "Schema group deleted." };
  }

  return { error: "Invalid action" };
};

const CURRENCY_OPTIONS = [
  { code: "USD", symbol: "$", name: "US Dollar" },
  { code: "EUR", symbol: "€", name: "Euro" },
  { code: "GBP", symbol: "£", name: "British Pound" },
  { code: "JPY", symbol: "¥", name: "Japanese Yen" },
  { code: "AUD", symbol: "A$", name: "Australian Dollar" },
  { code: "CAD", symbol: "C$", name: "Canadian Dollar" },
  { code: "CHF", symbol: "Fr", name: "Swiss Franc" },
  { code: "CNY", symbol: "¥", name: "Chinese Yuan" },
  { code: "HKD", symbol: "HK$", name: "Hong Kong Dollar" },
  { code: "NZD", symbol: "NZ$", name: "New Zealand Dollar" },
  { code: "SGD", symbol: "S$", name: "Singapore Dollar" },
  { code: "INR", symbol: "₹", name: "Indian Rupee" },
  { code: "BDT", symbol: "৳", name: "Bangladeshi Taka" },
  { code: "PKR", symbol: "Rs", name: "Pakistani Rupee" },
  { code: "LKR", symbol: "Rs", name: "Sri Lankan Rupee" },
  { code: "NPR", symbol: "Rs", name: "Nepalese Rupee" },
  { code: "KRW", symbol: "₩", name: "South Korean Won" },
  { code: "THB", symbol: "฿", name: "Thai Baht" },
  { code: "VND", symbol: "₫", name: "Vietnamese Dong" },
  { code: "IDR", symbol: "Rp", name: "Indonesian Rupiah" },
  { code: "MYR", symbol: "RM", name: "Malaysian Ringgit" },
  { code: "PHP", symbol: "₱", name: "Philippine Peso" },
  { code: "MXN", symbol: "$", name: "Mexican Peso" },
  { code: "BRL", symbol: "R$", name: "Brazilian Real" },
  { code: "ARS", symbol: "$", name: "Argentine Peso" },
  { code: "CLP", symbol: "$", name: "Chilean Peso" },
  { code: "COP", symbol: "$", name: "Colombian Peso" },
  { code: "PEN", symbol: "S/", name: "Peruvian Sol" },
  { code: "UYU", symbol: "$U", name: "Uruguayan Peso" },
  { code: "BOB", symbol: "Bs.", name: "Bolivian Boliviano" },
  { code: "PYG", symbol: "₲", name: "Paraguayan Guarani" },
  { code: "EGP", symbol: "E£", name: "Egyptian Pound" },
  { code: "ZAR", symbol: "R", name: "South African Rand" },
  { code: "NGN", symbol: "₦", name: "Nigerian Naira" },
  { code: "KES", symbol: "KSh", name: "Kenyan Shilling" },
  { code: "GHS", symbol: "GH₵", name: "Ghanaian Cedi" },
  { code: "XOF", symbol: "CFA", name: "West African CFA Franc" },
  { code: "XAF", symbol: "FCFA", name: "Central African CFA Franc" },
  { code: "MAD", symbol: "DH", name: "Moroccan Dirham" },
  { code: "TND", symbol: "DT", name: "Tunisian Dinar" },
  { code: "AED", symbol: "د.إ", name: "UAE Dirham" },
  { code: "SAR", symbol: "﷼", name: "Saudi Riyal" },
  { code: "QAR", symbol: "﷼", name: "Qatari Riyal" },
  { code: "KWD", symbol: "KD", name: "Kuwaiti Dinar" },
  { code: "BHD", symbol: "BD", name: "Bahraini Dinar" },
  { code: "OMR", symbol: "OMR", name: "Omani Rial" },
  { code: "JOD", symbol: "JD", name: "Jordanian Dinar" },
  { code: "LBP", symbol: "L£", name: "Lebanese Pound" },
  { code: "TRY", symbol: "₺", name: "Turkish Lira" },
  { code: "RUB", symbol: "₽", name: "Russian Ruble" },
  { code: "PLN", symbol: "zł", name: "Polish Zloty" },
  { code: "CZK", symbol: "Kč", name: "Czech Koruna" },
  { code: "HUF", symbol: "Ft", name: "Hungarian Forint" },
  { code: "RON", symbol: "lei", name: "Romanian Leu" },
  { code: "BGN", symbol: "lev", name: "Bulgarian Lev" },
  { code: "HRK", symbol: "kn", name: "Croatian Kuna" },
  { code: "RSD", symbol: "дин", name: "Serbian Dinar" },
  { code: "UAH", symbol: "₴", name: "Ukrainian Hryvnia" },
  { code: "SEK", symbol: "kr", name: "Swedish Krona" },
  { code: "NOK", symbol: "kr", name: "Norwegian Krone" },
  { code: "DKK", symbol: "kr", name: "Danish Krone" },
  { code: "ISK", symbol: "kr", name: "Icelandic Krona" },
  { code: "GEL", symbol: "₾", name: "Georgian Lari" },
  { code: "AMD", symbol: "֏", name: "Armenian Dram" },
  { code: "AZN", symbol: "₼", name: "Azerbaijani Manat" },
  { code: "KZT", symbol: "₸", name: "Kazakhstani Tenge" },
  { code: "UZS", symbol: "so'm", name: "Uzbekistani Som" },
  { code: "BYN", symbol: "Br", name: "Belarusian Ruble" },
  { code: "MDL", symbol: "lei", name: "Moldovan Leu" },
  { code: "GNF", symbol: "FG", name: "Guinean Franc" },
  { code: "XCD", symbol: "$", name: "East Caribbean Dollar" },
  { code: "TTD", symbol: "TT$", name: "Trinidad and Tobago Dollar" },
  { code: "JMD", symbol: "J$", name: "Jamaican Dollar" },
  { code: "BBD", symbol: "Bds$", name: "Barbadian Dollar" },
  { code: "BZD", symbol: "BZ$", name: "Belize Dollar" },
  { code: "GTQ", symbol: "Q", name: "Guatemalan Quetzal" },
  { code: "HNL", symbol: "L", name: "Honduran Lempira" },
  { code: "NIO", symbol: "C$", name: "Nicaraguan Cordoba" },
  { code: "CRC", symbol: "₡", name: "Costa Rican Colon" },
  { code: "PAB", symbol: "B/.", name: "Panamanian Balboa" },
  { code: "DOP", symbol: "RD$", name: "Dominican Peso" },
  { code: "HTG", symbol: "G", name: "Haitian Gourde" },
  { code: "CUP", symbol: "₱", name: "Cuban Peso" },
  { code: "ILS", symbol: "₪", name: "Israeli New Shekel" },
  { code: "IRR", symbol: "﷼", name: "Iranian Rial" },
  { code: "IQD", symbol: "ع.د", name: "Iraqi Dinar" },
  { code: "SYP", symbol: "£S", name: "Syrian Pound" },
  { code: "AFN", symbol: "؋", name: "Afghan Afghani" },
];

function SearchableCurrencySelect({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const options = CURRENCY_OPTIONS;
  const filtered = options.filter((c) =>
    c.code.toLowerCase().includes(search.toLowerCase()) ||
    c.symbol.toLowerCase().includes(search.toLowerCase()) ||
    c.name.toLowerCase().includes(search.toLowerCase())
  );
  const selected = options.find((c) => c.code === value) || options[0];

  return (
    <div style={{ position: "relative" }}>
      <div
        onClick={() => {
          setOpen(!open);
          setSearch("");
        }}
        style={{
          padding: "6px 12px",
          borderRadius: "6px",
          border: "1px solid #c9cccf",
          background: "#fff",
          fontSize: "14px",
          cursor: "pointer",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span>
          {selected.symbol} ({selected.code}) - {selected.name}
        </span>
        <span>{open ? "▲" : "▼"}</span>
      </div>
      {open && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            background: "#fff",
            border: "1px solid #c9cccf",
            borderRadius: "6px",
            marginTop: "4px",
            zIndex: 10,
            maxHeight: "200px",
            overflow: "auto",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }}
        >
          <input
            autoFocus
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search currency..."
            onClick={(e) => e.stopPropagation()}
            style={{
              padding: "8px",
              border: "none",
              borderBottom: "1px solid #e1e3e5",
              width: "100%",
              boxSizing: "border-box",
              outline: "none",
              fontSize: "14px",
            }}
          />
          {filtered.map((c) => (
            <div
              key={c.code}
              onClick={() => {
                onChange(c.code);
                setOpen(false);
                setSearch("");
              }}
              style={{
                padding: "8px 12px",
                cursor: "pointer",
                background: c.code === value ? "#f0f0f0" : "transparent",
              }}
            >
              {c.symbol} ({c.code}) - {c.name}
            </div>
          ))}
          {filtered.length === 0 && (
            <div style={{ padding: "8px 12px", color: "#6d7175" }}>
              No matches found.
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function Index() {
  const fetcher = useFetcher();
  const resourceFetcher = useFetcher();
  const shopify = useAppBridge();
  const loaderData = useLoaderData();
  const [searchParams] = useSearchParams();
  const [groupName, setGroupName] = useState("");

  function parseSchemasForState(group) {
    if (!group.schemas || group.schemas.length === 0) return [];
    return group.schemas.map((s) => {
      const typeKey = s.type.toLowerCase();
      let data = {};
      try {
        if (s.formData) {
          data = JSON.parse(s.formData);
        } else if (s.jsonContent) {
          data = { json: s.jsonContent };
        }
      } catch {
        data = {};
      }

      if (typeKey === "faq_page" && s.faqRows) {
        try {
          data.items = JSON.parse(s.faqRows);
        } catch {
          data.items = [{ question: "", answer: "" }];
        }
      }
      if (typeKey === "breadcrumb_list" && s.breadcrumbs) {
        try {
          data.items = JSON.parse(s.breadcrumbs);
        } catch {
          data.items = [{ name: "", url: "" }];
        }
      }

      return {
        id: s.id,
        type: s.type,
        label: s.name,
        mode: s.mode || "form",
        data,
      };
    });
  }
  const [activeGroup, setActiveGroup] = useState(null);
  const [injectTarget, setInjectTarget] = useState("liquid_snippet");
  const [savedTarget, setSavedTarget] = useState(null);
  const [notice, setNotice] = useState("");

  const [selectedResourceIds, setSelectedResourceIds] = useState([]);
  const [resources, setResources] = useState([]);
  const [resourceLoading, setResourceLoading] = useState(false);
  const [resourceError, setResourceError] = useState("");
  const [resourceSearch, setResourceSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [addedSchemas, setAddedSchemas] = useState([]);

  const [isActive, setIsActive] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [embedEnabled, setEmbedEnabled] = useState(false);
  const [embedBannerDismissed, setEmbedBannerDismissed] = useState(false);

  useEffect(() => {
    if (loaderData?.editGroup) {
      const group = loaderData.editGroup;
      setActiveGroup(group);
      setGroupName(group.name);
      setIsActive(group.isActive ?? true);
      setNotice(`Editing schema group: ${group.name}`);
      shopify.toast.show(`Editing schema group: ${group.name}`);
      setTimeout(() => setNotice(""), 3000);

      if (group.targets && group.targets.length > 0) {
        const target = group.targets[0];
        setInjectTarget(target.injectType || "liquid_snippet");
        setSelectedResourceIds(
          target.pageIds
            ? target.pageIds.split(",").filter(Boolean)
            : target.postIds
            ? target.postIds.split(",").filter(Boolean)
            : []
        );
      }

      if (group.schemas && group.schemas.length > 0) {
        setAddedSchemas(parseSchemasForState(group));
      } else {
        setAddedSchemas([]);
      }
    }
  }, [loaderData, shopify]);

  useEffect(() => {
    const targetType = searchParams.get("targetType");
    const targetId = searchParams.get("targetId");
    const targetTitle = searchParams.get("targetTitle");

    if (targetType && targetId && !activeGroup && !loaderData?.editGroup) {
      const mappedInjectType =
        targetType === "product"
          ? "specific_products"
          : targetType === "page"
          ? "specific_pages"
          : targetType === "article"
          ? "specific_blogs"
          : null;

      if (mappedInjectType) {
        setInjectTarget(mappedInjectType);
        setSelectedResourceIds([targetId]);
      }

      const defaultName = targetTitle ? `Schema - ${targetTitle}` : "";
      if (defaultName) {
        setGroupName(defaultName);
      }
    }
  }, [searchParams, activeGroup, loaderData]);

  useEffect(() => {
    if (fetcher.data?.group) {
      setActiveGroup(fetcher.data.group);
      setAddedSchemas(parseSchemasForState(fetcher.data.group));
      setNotice(fetcher.data.message || "Group loaded");
      shopify.toast.show(fetcher.data.message || "Group loaded");
      setTimeout(() => setNotice(""), 3000);
    }
    if (fetcher.data?.success && fetcher.data?.message) {
      setSavedTarget(injectTarget);
      shopify.toast.show(fetcher.data.message);
      setNotice(fetcher.data.message);
      setTimeout(() => setNotice(""), 3000);

      if (fetcher.data.message?.includes("deleted")) {
        setActiveGroup(null);
        setGroupName("");
        setAddedSchemas([]);
        setIsActive(true);
        setShowDeleteModal(false);
      }
    }
    if (fetcher.data?.error) {
      shopify.toast.show(fetcher.data.error);
      setNotice(fetcher.data.error);
      setTimeout(() => setNotice(""), 3000);
    }
  }, [fetcher.data, shopify, injectTarget]);

  useEffect(() => {
    if (activeGroup?.isActive !== undefined) {
      setIsActive(activeGroup.isActive);
    }
  }, [activeGroup]);

  useEffect(() => {
    if (
      injectTarget === "specific_pages" ||
      injectTarget === "specific_products" ||
      injectTarget === "specific_blogs"
    ) {
      const fd = new FormData();
      fd.append("action", "fetchResources");
      fd.append("resourceType", injectTarget.replace("specific_", ""));
      if (resourceSearch.trim()) {
        fd.append("query", resourceSearch.trim());
      }
      setResourceLoading(true);
      setResourceError("");
      resourceFetcher.submit(fd, { method: "post" });
    }
  }, [injectTarget, resourceSearch]);

  useEffect(() => {
    if (resourceFetcher.data?.resources) {
      setResources(resourceFetcher.data.resources);
      setResourceLoading(false);
      setCurrentPage(1);
    }
    if (resourceFetcher.data?.error) {
      setResourceError(resourceFetcher.data.error);
      setResourceLoading(false);
    }
  }, [resourceFetcher.data]);

  useEffect(() => {
    const checkEmbedStatus = async () => {
      try {
        const res = await fetch("/api/embed-status");
        const data = await res.json();
        setEmbedEnabled(data.embedEnabled);
      } catch {
        setEmbedEnabled(false);
      }
    };
    const dismissed = localStorage.getItem("schemaEmbedBannerDismissed");
    if (dismissed === "true") {
      setEmbedBannerDismissed(true);
    }
    checkEmbedStatus();
  }, []);

  const handleCreateOrLoad = () => {
    if (!groupName.trim()) return;
    const fd = new FormData();
    fd.append("action", "createOrLoadGroup");
    fd.append("groupName", groupName.trim());
    fetcher.submit(fd, { method: "post" });
  };

  const handleLoad = () => {
    if (!groupName.trim()) return;
    const fd = new FormData();
    fd.append("action", "loadGroupByName");
    fd.append("groupName", groupName.trim());
    fetcher.submit(fd, { method: "post" });
  };

  const handleChangeGroup = () => {
    setActiveGroup(null);
    setGroupName("");
    setInjectTarget("liquid_snippet");
    setSavedTarget(null);
    setNotice("");
    setSelectedResourceIds([]);
    setResources([]);
    setResourceError("");
    setResourceSearch("");
    setCurrentPage(1);
    setItemsPerPage(10);
    setIsActive(true);
    setShowDeleteModal(false);
  };

  const handleInjectTargetChange = (e) => {
    const value = e.target.value;
    setInjectTarget(value);
    setSelectedResourceIds([]);
    setResourceError("");
    setResourceSearch("");
    setCurrentPage(1);
  };

  const handleSaveTarget = () => {
    if (!activeGroup) return;
    const fd = new FormData();
    fd.append("action", "saveTarget");
    fd.append("groupId", activeGroup.id);
    fd.append("injectType", injectTarget);
    fd.append("selectedIds", selectedResourceIds.join(","));
    fetcher.submit(fd, { method: "post" });
  };

  const handleCopyShortcode = () => {
    const snippet = `{% render 'ultimate-schema', group: '${(activeGroup?.slug || groupName).replace(/'/g, "\\'")}' %}`;
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(snippet).then(() => {
        shopify.toast.show("Liquid snippet copied to clipboard");
      });
    }
  };

  const handleSaveGroup = async () => {
    if (!activeGroup) return;
    const schemas = addedSchemas.map((schema) => {
      const base = {
        type: schema.type,
        name: schema.label || schema.type,
        mode: schema.mode,
        sortOrder: 0,
      };

      if (schema.mode === "json") {
        return { ...base, jsonContent: schema.data?.json || "" };
      }

      const formData = { ...schema.data };
      delete formData.json;

      if (schema.type === "faq_page") {
        return { ...base, formData: null, faqRows: JSON.stringify(formData.items || []) };
      }
      if (schema.type === "breadcrumb_list") {
        return { ...base, formData: null, breadcrumbs: JSON.stringify(formData.items || []) };
      }

      return { ...base, formData: JSON.stringify(formData) };
    });
    const fd = new FormData();
    fd.append("action", "saveGroup");
    fd.append("groupId", activeGroup.id);
    fd.append("isActive", isActive ? "1" : "0");
    fd.append("schemas", JSON.stringify(schemas));
    fetcher.submit(fd, { method: "post" });
  };

  const handleToggleActive = async () => {
    if (!activeGroup) return;
    const newStatus = !isActive;
    setIsActive(newStatus);
    const fd = new FormData();
    fd.append("action", "toggleActive");
    fd.append("groupId", activeGroup.id);
    fd.append("isActive", newStatus ? "1" : "0");
    fetcher.submit(fd, { method: "post" });
  };

  const handleDeleteGroup = () => {
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (!activeGroup) return;
    const fd = new FormData();
    fd.append("action", "deleteGroup");
    fd.append("groupId", activeGroup.id);
    fetcher.submit(fd, { method: "post" });
    setShowDeleteModal(false);
  };

  const toggleResource = (id) => {
    setSelectedResourceIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const getDefaultSchemaData = (type) => {
    switch (type) {
      case "FAQPage":
        return { items: [{ question: "", answer: "" }], customJson: "" };
      case "Product":
        return { name: "", url: "", description: "", imageUrl: "", brand: "", sku: "", price: "", salePrice: "", currency: "", customJson: "" };
      case "Article":
        return { headline: "", url: "", description: "", imageUrl: "", author: "", date: "", customJson: "" };
      case "Event":
        return { name: "", url: "", description: "", imageUrl: "", startDate: "", endDate: "", location: "", customJson: "" };
      case "Person":
        return { name: "", url: "", description: "", imageUrl: "", jobTitle: "", customJson: "" };
      case "Organization":
        return { name: "", url: "", description: "", logoUrl: "", telephone: "", street: "", city: "", state: "", postalCode: "", country: "", customJson: "" };
      case "LocalBusiness":
        return { name: "", url: "", description: "", logoUrl: "", telephone: "", priceRange: "", street: "", city: "", state: "", postalCode: "", country: "", latitude: "", longitude: "", customJson: "" };
      case "Service":
        return { name: "", url: "", description: "", imageUrl: "", customJson: "" };
      case "BreadcrumbList":
        return { items: [{ name: "", url: "" }], customJson: "" };
      case "WebPage":
        return { name: "", url: "", description: "", imageUrl: "", customJson: "" };
      case "WebSite":
        return { name: "", url: "", description: "", imageUrl: "", customJson: "" };
      case "CustomJSON":
        return { json: "", customJson: "" };
      default:
        return { customJson: "" };
    }
  };

  const getSchemaDescription = (type) => {
    switch (type) {
      case "FAQPage":
        return "A list of questions and answers. Each pair becomes a Question / acceptedAnswer entry inside an FAQPage schema.";
      case "Product":
        return "A product you sell, including pricing via an Offer.";
      case "Article":
        return "A news article, blog post, or other written content. Use on post templates.";
      case "Event":
        return "An upcoming or past event. Dates use ISO 8601 format.";
      case "Person":
        return "A person: an author, founder, team member, or public figure.";
      case "Organization":
        return "Company or organization information, logo, and social profiles.";
      case "LocalBusiness":
        return "Local business details including address, hours, and contact info.";
      case "Service":
        return "Service offering with name, description, and provider details.";
      case "BreadcrumbList":
        return "Navigation breadcrumbs schema specifying page hierarchy and links.";
      case "WebPage":
        return "Describes a single page on your site.";
      case "WebSite":
        return "Represents the whole website. Often used together with a Sitelinks SearchBox action.";
      case "CustomJSON":
        return "Paste raw JSON-LD directly into the text area below.";
      default:
        return "";
    }
  };

  const handleAddSchema = () => {
    const newSchema = {
      id: Date.now().toString(),
      label: "",
      type: "local_business",
      mode: "form",
      data: getDefaultSchemaData("LocalBusiness"),
    };
    setAddedSchemas((prev) => [...prev, newSchema]);
  };

  const handleRemoveSchema = (id) => {
    setAddedSchemas((prev) => prev.filter((s) => s.id !== id));
  };

  const handleSchemaLabelChange = (id, value) => {
    setAddedSchemas((prev) =>
      prev.map((s) => (s.id === id ? { ...s, label: value } : s))
    );
  };

  const toSchemaType = (value) => {
    const map = {
      faq_page: "FAQPage",
      product: "Product",
      article: "Article",
      event: "Event",
      person: "Person",
      organization: "Organization",
      local_business: "LocalBusiness",
      service: "Service",
      breadcrumb_list: "BreadcrumbList",
      web_page: "WebPage",
      web_site: "WebSite",
      customjson: "CustomJSON",
    };
    return map[value] || value;
  };

  const handleSchemaTypeChange = (id, value) => {
    setAddedSchemas((prev) =>
      prev.map((s) => (s.id === id ? { ...s, type: value, data: getDefaultSchemaData(toSchemaType(value)) } : s))
    );
  };

  const handleSchemaModeChange = (id, mode) => {
    setAddedSchemas((prev) =>
      prev.map((s) => {
        if (s.id !== id) return s;
        if (mode === "json") {
          const generated = generateSchemaJsonLd(s.type, s.data || {});
          return { ...s, mode, data: { ...s.data, json: generated } };
        }
        if (mode === "form") {
          const currentJson = s.data?.json || "";
          const parsed = parseSchemaJsonLd(currentJson);
          if (parsed) {
            const currentLabel = s.label || "";
            return {
              ...s,
              mode,
              type: parsed.type,
              label: currentLabel,
              data: { ...getDefaultSchemaData(toSchemaType(parsed.type)), ...parsed.data },
            };
          }
          return { ...s, mode };
        }
        return { ...s, mode };
      })
    );
  };

  const handleSchemaFieldChange = (id, field, value) => {
    setAddedSchemas((prev) =>
      prev.map((s) => (s.id === id ? { ...s, data: { ...s.data, [field]: value } } : s))
    );
  };

  const handleFaqItemChange = (id, index, field, value) => {
    setAddedSchemas((prev) =>
      prev.map((s) => {
        if (s.id !== id) return s;
        const items = [...(s.data.items || [])];
        if (!items[index]) return s;
        items[index] = { ...items[index], [field]: value };
        return { ...s, data: { ...s.data, items } };
      })
    );
  };

  const handleAddFaqItem = (id) => {
    setAddedSchemas((prev) =>
      prev.map((s) => {
        if (s.id !== id) return s;
        const items = [...(s.data.items || []), { question: "", answer: "" }];
        return { ...s, data: { ...s.data, items } };
      })
    );
  };

  const handleRemoveFaqItem = (id, index) => {
    setAddedSchemas((prev) =>
      prev.map((s) => {
        if (s.id !== id) return s;
        const items = (s.data.items || []).filter((_, i) => i !== index);
        return { ...s, data: { ...s.data, items } };
      })
    );
  };

  const handleBreadcrumbItemChange = (id, index, field, value) => {
    setAddedSchemas((prev) =>
      prev.map((s) => {
        if (s.id !== id) return s;
        const items = [...(s.data.items || [])];
        if (!items[index]) return s;
        items[index] = { ...items[index], [field]: value };
        return { ...s, data: { ...s.data, items } };
      })
    );
  };

  const handleAddBreadcrumbItem = (id) => {
    setAddedSchemas((prev) =>
      prev.map((s) => {
        if (s.id !== id) return s;
        const items = [...(s.data.items || []), { name: "", url: "" }];
        return { ...s, data: { ...s.data, items } };
      })
    );
  };

  const handleRemoveBreadcrumbItem = (id, index) => {
    setAddedSchemas((prev) =>
      prev.map((s) => {
        if (s.id !== id) return s;
        const items = (s.data.items || []).filter((_, i) => i !== index);
        return { ...s, data: { ...s.data, items } };
      })
    );
  };

  const generateSchemaJsonLd = (type, data) => {
    const base = {
      "@context": "https://schema.org",
      "@type": toSchemaType(type),
    };

    if (data.customJson && data.customJson.trim()) {
      try {
        const custom = JSON.parse(data.customJson);
        Object.assign(base, custom);
        return JSON.stringify(base, null, 2);
      } catch {
        base.customProperties = data.customJson;
      }
    }

    switch (type) {
      case "faq_page": {
        const payload = { ...base };
        const items = (data.items || []).filter((item) => item.question || item.answer);
        if (items.length > 0) {
          payload.mainEntity = items.map((item) => ({
            "@type": "Question",
            name: item.question || "",
            acceptedAnswer: {
              "@type": "Answer",
              text: item.answer || "",
            },
          }));
        }
        return JSON.stringify(payload, null, 2);
      }
      case "product": {
        const payload = { ...base };
        payload.name = data.name || "";
        payload.url = data.url || "";
        payload.description = data.description || "";
        payload.image = data.imageUrl || "";
        payload.brand = {
          "@type": "Brand",
          name: data.brand || "",
        };
        payload.sku = data.sku || "";
        const effectivePrice = data.salePrice || data.price || "";
        payload.offers = {
          "@type": "Offer",
          price: effectivePrice,
          priceCurrency: data.currency || "USD",
          availability: "https://schema.org/InStock",
        };
        return JSON.stringify(payload, null, 2);
      }
      case "article": {
        const payload = { ...base };
        payload.headline = data.headline || "";
        payload.url = data.url || "";
        payload.description = data.description || "";
        payload.image = data.imageUrl || "";
        payload.author = {
          "@type": "Person",
          name: data.author || "",
        };
        payload.datePublished = data.date || "";
        return JSON.stringify(payload, null, 2);
      }
      case "event": {
        const payload = { ...base };
        payload.name = data.name || "";
        payload.url = data.url || "";
        payload.description = data.description || "";
        payload.image = data.imageUrl || "";
        payload.startDate = data.startDate || "";
        payload.endDate = data.endDate || "";
        payload.location = {
          "@type": "Place",
          name: data.location || "",
        };
        return JSON.stringify(payload, null, 2);
      }
      case "person": {
        const payload = { ...base };
        payload.name = data.name || "";
        payload.url = data.url || "";
        payload.description = data.description || "";
        payload.image = data.imageUrl || "";
        payload.jobTitle = data.jobTitle || "";
        return JSON.stringify(payload, null, 2);
      }
      case "organization": {
        const payload = { ...base };
        payload.name = data.name || "";
        payload.url = data.url || "";
        payload.description = data.description || "";
        payload.logo = data.logoUrl || "";
        payload.telephone = data.telephone || "";
        payload.address = {
          "@type": "PostalAddress",
          streetAddress: data.street || "",
          addressLocality: data.city || "",
          addressRegion: data.state || "",
          postalCode: data.postalCode || "",
          addressCountry: data.country || "",
        };
        return JSON.stringify(payload, null, 2);
      }
      case "local_business": {
        const payload = { ...base };
        payload.name = data.name || "";
        payload.url = data.url || "";
        payload.description = data.description || "";
        payload.logo = data.logoUrl || "";
        payload.telephone = data.telephone || "";
        payload.priceRange = data.priceRange || "";
        payload.image = data.imageUrl || "";
        payload.address = {
          "@type": "PostalAddress",
          streetAddress: data.street || "",
          addressLocality: data.city || "",
          addressRegion: data.state || "",
          postalCode: data.postalCode || "",
          addressCountry: data.country || "",
        };
        payload.geo = {
          "@type": "GeoCoordinates",
          latitude: data.latitude || "",
          longitude: data.longitude || "",
        };
        return JSON.stringify(payload, null, 2);
      }
      case "service": {
        const payload = { ...base };
        payload.name = data.name || "";
        payload.url = data.url || "";
        payload.description = data.description || "";
        payload.image = data.imageUrl || "";
        return JSON.stringify(payload, null, 2);
      }
      case "breadcrumb_list": {
        const payload = { ...base };
        const items = (data.items || []).filter((item) => item.name || item.url);
        payload.itemListElement = items.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.name || "",
          item: item.url || "",
        }));
        return JSON.stringify(payload, null, 2);
      }
      case "web_page": {
        const payload = { ...base };
        payload.name = data.name || "";
        payload.url = data.url || "";
        payload.description = data.description || "";
        payload.image = data.imageUrl || "";
        return JSON.stringify(payload, null, 2);
      }
      case "web_site": {
        const payload = { ...base };
        payload.name = data.name || "";
        payload.url = data.url || "";
        payload.description = data.description || "";
        payload.image = data.imageUrl || "";
        return JSON.stringify(payload, null, 2);
      }
      default:
        return JSON.stringify(base, null, 2);
    }
  };

  const parseSchemaJsonLd = (jsonString) => {
    let parsed;
    try {
      parsed = JSON.parse(jsonString);
    } catch {
      return null;
    }

    if (!parsed || typeof parsed !== "object") return null;

    const typeValue = parsed["@type"];
    const typeMap = {
      FAQPage: "faq_page",
      Product: "product",
      Article: "article",
      Event: "event",
      Person: "person",
      Organization: "organization",
      LocalBusiness: "local_business",
      Service: "service",
      BreadcrumbList: "breadcrumb_list",
      WebPage: "web_page",
      WebSite: "web_site",
    };

    const mappedType = typeMap[typeValue];
    if (!mappedType) return null;

    const formData = { customJson: "" };
    const knownFields = getKnownFieldsForType(mappedType);

    for (const key of Object.keys(parsed)) {
      if (key === "@context" || key === "@type") continue;
      if (knownFields.includes(key)) {
        if (typeof parsed[key] === "object" && parsed[key] !== null) {
          if (key === "brand" && parsed[key].name) formData.brand = parsed[key].name;
          else if (key === "offers") {
            formData.price = parsed[key].price || "";
            formData.salePrice = "";
            formData.currency = parsed[key].priceCurrency || "USD";
          } else if (key === "address" && typeof parsed[key] === "object") {
            formData.street = parsed[key].streetAddress || "";
            formData.city = parsed[key].addressLocality || "";
            formData.state = parsed[key].addressRegion || "";
            formData.postalCode = parsed[key].postalCode || "";
            formData.country = parsed[key].addressCountry || "";
          } else if (key === "geo" && typeof parsed[key] === "object") {
            formData.latitude = parsed[key].latitude || "";
            formData.longitude = parsed[key].longitude || "";
          } else if (key === "author" && typeof parsed[key] === "object") {
            formData.author = parsed[key].name || "";
          } else if (key === "location" && typeof parsed[key] === "object") {
            formData.location = parsed[key].name || "";
          } else if (key === "datePublished") {
            formData.date = parsed[key] || "";
          } else if (key === "mainEntity" && Array.isArray(parsed[key])) {
            formData.items = parsed[key]
              .map((entry) => ({
                question: entry.name || "",
                answer: entry.acceptedAnswer?.text || "",
              }))
              .filter((item) => item.question || item.answer);
            if (formData.items.length === 0) {
              formData.items = [{ question: "", answer: "" }];
            }
          } else if (key === "itemListElement" && Array.isArray(parsed[key])) {
            formData.items = parsed[key]
              .map((entry) => ({
                name: entry.name || "",
                url: entry.item || entry.url || "",
              }))
              .filter((item) => item.name || item.url);
            if (formData.items.length === 0) {
              formData.items = [{ name: "", url: "" }];
            }
          } else {
            formData[key] = JSON.stringify(parsed[key]);
          }
        } else {
          if (key === "image") {
            formData.imageUrl = parsed[key];
          } else {
            formData[key] = parsed[key];
          }
        }
      }
    }

    const customProperties = {};
    for (const key of Object.keys(parsed)) {
      if (key === "@context" || key === "@type") continue;
      if (!knownFields.includes(key)) {
        customProperties[key] = parsed[key];
      }
    }
    if (Object.keys(customProperties).length > 0) {
      formData.customJson = JSON.stringify(customProperties, null, 2);
    }

    return { type: mappedType, data: formData };
  };

  const getKnownFieldsForType = (type) => {
    switch (type) {
      case "faq_page":
        return ["mainEntity", "items"];
      case "product":
        return ["name", "url", "description", "image", "brand", "sku", "offers", "price", "salePrice", "currency"];
      case "article":
        return ["headline", "url", "description", "image", "author", "datePublished"];
      case "event":
        return ["name", "url", "description", "image", "startDate", "endDate", "location"];
      case "person":
        return ["name", "url", "description", "image", "jobTitle"];
      case "organization":
        return ["name", "url", "description", "logo", "telephone", "address", "street", "city", "state", "postalCode", "country"];
      case "local_business":
        return ["name", "url", "description", "logo", "telephone", "priceRange", "image", "address", "street", "city", "state", "postalCode", "country", "geo", "latitude", "longitude"];
      case "service":
        return ["name", "url", "description", "image"];
      case "breadcrumb_list":
        return ["itemListElement", "items"];
      case "web_page":
        return ["name", "url", "description", "image"];
      case "web_site":
        return ["name", "url", "description", "image"];
      default:
        return [];
    }
  };


  const shortcode = activeGroup ? `{% render 'ultimate-schema', group: '${activeGroup.slug.replace(/'/g, "\\'")}' %}` : "";

  const filteredResources = resources.filter((r) =>
    r.title.toLowerCase().includes(resourceSearch.toLowerCase())
  );

  const totalPages = Math.max(1, Math.ceil(filteredResources.length / itemsPerPage));
  const safePage = Math.min(currentPage, totalPages);
  const startIndex = (safePage - 1) * itemsPerPage;
  const paginatedResources = filteredResources.slice(startIndex, startIndex + itemsPerPage);

  const getBannerTone = (msg) => {
    const lower = (msg || "").toLowerCase();
    if (lower.includes("error") || lower.includes("not found") || lower.includes("required")) {
      return "critical";
    }
    return "success";
  };

  const injectTargetLabel = (val) => {
    const map = {
      shortcode: "Use Shortcode",
      specific_pages: "Specific Pages",
      specific_products: "Specific Products",
      specific_blogs: "Specific Blogs",
      all_pages: "All Pages",
      all_products: "All Products",
      all_blogs: "All Blogs",
    };
    return map[val] || val;
  };

  const resourceTypeLabel = injectTarget.replace("specific_", "").replace("all_", "");

  return (
    <s-page heading="Schema Injector">
      {notice && (
        <s-banner
          tone={getBannerTone(notice)}
          onDismiss={() => setNotice("")}
          style={{ marginBottom: "16px" }}
        >
          {notice}
        </s-banner>
      )}

      {!embedEnabled && !embedBannerDismissed && (
        <s-banner
          tone="warning"
          style={{ marginBottom: "16px" }}
        >
          <s-stack direction="block" gap="base">
            <s-text>
              <strong>Action Required:</strong> Enable Schema Injector in your theme to start injecting JSON-LD schemas.
            </s-text>
            <s-button
              variant="primary"
              onClick={() => {
                const url = getThemeEditorDeepLink(loaderData?.shop);
                if (url) window.open(url, "_blank", "noopener,noreferrer");
              }}
            >
              Enable in Theme Editor
            </s-button>
            <s-text tone="subdued">
              Clicking the button will open the Theme Editor directly at the App Embeds tab with Schema Injector focused, where you just need to click "Save" to activate it.
            </s-text>
            <s-button
              variant="secondary"
              tone="critical"
              onClick={() => {
                setEmbedBannerDismissed(true);
                localStorage.setItem("schemaEmbedBannerDismissed", "true");
              }}
            >
              Dismiss
            </s-button>
          </s-stack>
        </s-banner>
      )}

      {/* Step 1: Group Setup */}
      <s-section heading="1. Add a New Schema Group">
        <s-stack direction="block" gap="base">
          <s-paragraph>
            Create or load a schema group to get started. You can manage your schemas from the Manage Schemas page.
          </s-paragraph>
          {!activeGroup && (
            <>
              <s-text-field
                label="Schema Group Name"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                placeholder="Enter schema group name"
                autoComplete="off"
              />
              <s-stack direction="inline" gap="base">
                <s-button onClick={handleCreateOrLoad}>Create</s-button>
                <s-button variant="secondary" onClick={handleLoad}>
                  Load
                </s-button>
              </s-stack>
            </>
          )}
          {activeGroup && (
            <s-stack direction="inline" gap="base" alignItems="center">
              <s-box
                padding="base"
                borderWidth="base"
                borderRadius="base"
                background="subdued"
              >
                <s-paragraph>
                  <strong>Active Group:</strong> {activeGroup.name} <s-text tone="subdued">(Slug: {activeGroup.slug})</s-text>
                </s-paragraph>
              </s-box>
              <s-button variant="secondary" onClick={handleChangeGroup}>
                Change Group
              </s-button>
                        </s-stack>
          )}
        </s-stack>
      </s-section>


      {/* Step 2: Auto Inject Target */}
      {activeGroup && (
        <>
          <s-section heading="2. Auto Inject Target">
          <s-stack direction="block" gap="base">
            <s-paragraph>
              Choose where to inject your schema automatically or use the shortcode.
            </s-paragraph>

            <s-select
              label="Inject Into"
              value={injectTarget}
              onChange={handleInjectTargetChange}
            >
              <s-option value="liquid_snippet">Use Liquid Snippet</s-option>
              <s-option value="specific_pages">Specific Pages</s-option>
              <s-option value="specific_products">Specific Products</s-option>
              <s-option value="specific_blogs">Specific Blogs</s-option>
              <s-option value="all_pages">All Pages</s-option>
              <s-option value="all_products">All Products</s-option>
              <s-option value="all_blogs">All Blogs</s-option>
            </s-select>

            {injectTarget === "liquid_snippet" ? (
              <s-box
                padding="base"
                borderWidth="base"
                borderRadius="base"
                background="subdued"
              >
                <s-stack direction="block" gap="base">
                  <s-paragraph>
                    Paste this Liquid snippet anywhere inside your theme files to render this schema group manually.
                  </s-paragraph>
                  <s-stack direction="inline" gap="base" alignItems="center">
                    <s-text-field
                      value={shortcode}
                      readOnly
                      style={{ fontFamily: "monospace" }}
                    />
                     <s-button variant="secondary" onClick={handleCopyShortcode}>
                       Copy
                     </s-button>
                         </s-stack>
        </s-stack>
              </s-box>
            ) : null}

            {(injectTarget === "specific_pages" || injectTarget === "specific_products" || injectTarget === "specific_blogs") ? (
              <s-stack direction="block" gap="base">
                <div style={{ display: "flex", width: "100%", gap: "16px", alignItems: "flex-end", marginBottom: "16px" }}>
                  <div style={{ flex: "1 1 80%", minWidth: "0" }}>
                    <s-text-field
                      label="Search"
                      value={resourceSearch}
                      onChange={(e) => {
                        setResourceSearch(e.target.value);
                        setCurrentPage(1);
                      }}
                      placeholder={"Search " + resourceTypeLabel + "s..."}
                      autoComplete="off"
                    />
                  </div>
                  <div style={{ flex: "0 0 20%", minWidth: "120px" }}>
                    <s-select
                      label="Items per page"
                      value={String(itemsPerPage)}
                      onChange={(e) => {
                        setItemsPerPage(Number(e.target.value));
                        setCurrentPage(1);
                      }}
                    >
                      <s-option value="10">10</s-option>
                      <s-option value="20">20</s-option>
                      <s-option value="50">50</s-option>
                    </s-select>
                  </div>
                </div>

                {resourceLoading ? (
                  <s-stack direction="inline" gap="base" alignItems="center">
                    <s-spinner size="base" accessibilityLabel="Loading resources" />
                    <s-paragraph>Loading {resourceTypeLabel}s...</s-paragraph>
                  </s-stack>
                ) : null}

                {resourceError ? (
                  <s-banner tone="critical" onDismiss={() => setResourceError("")}>
                    {resourceError}
                  </s-banner>
                ) : null}

                {!resourceLoading && resources.length > 0 ? (
                  <s-stack direction="block" gap="base">
                    <div
                      style={{
                        border: "1px solid #e1e3e5",
                        borderRadius: "8px",
                        overflow: "hidden",
                      }}
                    >
                      {paginatedResources.map((item) => {
                        return (
                          <div
                            key={item.id}
                            onClick={() => toggleResource(item.id)}
                            style={{
                              padding: "12px 16px",
                              borderBottom: "1px solid #e1e3e5",
                              display: "flex",
                              alignItems: "center",
                              gap: "16px",
                              cursor: "pointer",
                            }}
                          >
                            <div style={{ display: "flex", alignItems: "center" }}>
                              <s-checkbox
                                value={item.id}
                                checked={selectedResourceIds.includes(item.id)}
                                onChange={(e) => {
                                  e.stopPropagation();
                                  toggleResource(item.id);
                                }}
                              />
                            </div>
                            <div style={{ width: "40px", height: "40px", flexShrink: 0 }}>
                              {injectTarget === "specific_products" && item.imageUrl ? (
                                <s-thumbnail size="small" src={item.imageUrl} alt={item.title} />
                              ) : null}
                              {injectTarget === "specific_products" && !item.imageUrl ? (
                                <s-thumbnail size="small" alt={item.title} />
                              ) : null}
                            </div>
                            <div style={{ display: "flex", flexDirection: "column", gap: "4px", flex: 1, minWidth: 0 }}>
                              <span style={{ fontWeight: "600", fontSize: "14px" }}>{item.title}</span>
                              {injectTarget === "specific_products" && item.price ? (
                                <span style={{ color: "#6d7175", fontSize: "12px" }}>{item.price}</span>
                              ) : null}
                              {(injectTarget === "specific_pages" || injectTarget === "specific_blogs") && item.url ? (
                                <span style={{ color: "#6d7175", fontSize: "12px" }}>{item.url}</span>
                              ) : null}
                            </div>
                          </div>
                        );
                      })}
                      {paginatedResources.length === 0 ? (
                        <s-paragraph tone="subdued" style={{ padding: "12px 16px" }}>No matches found.</s-paragraph>
                      ) : null}
                    </div>

                    <s-stack direction="inline" gap="base" alignItems="center" justifyContent="space-between">
                      <s-stack direction="inline" gap="base" alignItems="center">
                        <s-button
                          variant="secondary"
                          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                          disabled={safePage <= 1}
                        >
                          Previous
                        </s-button>
                        <s-text>
                          Page {safePage} of {totalPages}
                        </s-text>
                        <s-button
                          variant="secondary"
                          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                          disabled={safePage >= totalPages}
                        >
                          Next
                        </s-button>
                      </s-stack>
                      <s-paragraph>
                        <strong>{selectedResourceIds.length}</strong> {resourceTypeLabel}(s) selected
                      </s-paragraph>
                    </s-stack>
                  </s-stack>
                ) : null}
                {!resourceLoading && resources.length === 0 && !resourceError && (
                  <s-paragraph tone="subdued">No {resourceTypeLabel}s found.</s-paragraph>
                )}
              </s-stack>
            ) : null}

            {(injectTarget === "all_pages" || injectTarget === "all_products" || injectTarget === "all_blogs") ? (
              <s-banner tone="info">
                This will inject the schema into all {resourceTypeLabel}s automatically.
              </s-banner>
            ) : null}

            <s-stack direction="inline" gap="base">
              <s-button variant="primary" onClick={handleSaveTarget}>
                Save Target
              </s-button>
              {savedTarget ? (
                <s-banner tone="success" onDismiss={() => setSavedTarget(null)}>
                  Target saved as: {injectTargetLabel(savedTarget)}
                </s-banner>
              ) : null}
            </s-stack>
          </s-stack>
        </s-section>


        {/* Step 3: Add Schema Data */}
        <s-section heading="3. Add Schema Data">
          <s-stack direction="block" gap="base">
            <s-paragraph>
              Add one or more schemas. Choose a Schema Type and the matching fields appear automatically. Toggle Direct JSON mode to paste raw JSON-LD.
            </s-paragraph>

            <s-stack direction="block" gap="base">
              {addedSchemas.map((schema) => (
                <div
                  key={schema.id}
                  style={{
                    padding: "20px",
                    borderRadius: "8px",
                    border: "1px solid #e1e3e5",
                    backgroundColor: "#ffffff",
                    marginBottom: "16px",
                  }}
                >
                  <s-stack direction="block" gap="base">
                    <s-stack direction="inline" blockAlign="center" gap="base" style={{ justifyContent: "space-between" }}>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <s-text-field
                          label="Schema Name"
                          value={schema.label || ""}
                          onChange={(e) => handleSchemaLabelChange(schema.id, e.target.value)}
                          placeholder="e.g., localbusiness schema"
                          autoComplete="off"
                        />
                      </div>
                      <s-button variant="secondary" tone="critical" onClick={() => handleRemoveSchema(schema.id)}>Remove</s-button>
                    </s-stack>

                    <div style={{ display: "flex", alignItems: "center", gap: "16px", marginTop: "12px", marginBottom: "12px", flexWrap: "wrap" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <strong>Schema Type</strong>
                        <select
                          value={schema.type}
                          onChange={(e) => handleSchemaTypeChange(schema.id, e.target.value)}
                          style={{ padding: "6px 12px", borderRadius: "6px", border: "1px solid #c9cccf", background: "#fff", fontSize: "14px" }}
                        >
                          <option value="" disabled>Select a schema type...</option>
                          <optgroup label="Business">
                            <option value="local_business">Local Business</option>
                            <option value="organization">Organization</option>
                            <option value="service">Service</option>
                          </optgroup>
                          <optgroup label="Commerce">
                            <option value="product">Product</option>
                          </optgroup>
                          <optgroup label="Content">
                            <option value="article">Article</option>
                            <option value="event">Event</option>
                            <option value="faq_page">FAQ Page</option>
                            <option value="person">Person</option>
                          </optgroup>
                          <optgroup label="Site">
                            <option value="breadcrumb_list">Breadcrumb List</option>
                            <option value="web_page">Web Page</option>
                            <option value="web_site">Web Site</option>
                          </optgroup>
                        </select>
                      </div>

                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <span>Mode</span>
                        <div style={{ display: "flex", background: "#eef0f2", padding: "3px", borderRadius: "6px" }}>
                          <button
                            type="button"
                            onClick={() => handleSchemaModeChange(schema.id, "form")}
                            style={{
                              padding: "6px 14px",
                              borderRadius: "6px",
                              border: "none",
                              cursor: "pointer",
                              background: schema.mode === "form" ? "#000000" : "transparent",
                              color: schema.mode === "form" ? "#ffffff" : "#303030",
                              fontWeight: "bold",
                            }}
                          >
                            Form
                          </button>
                          <button
                            type="button"
                            onClick={() => handleSchemaModeChange(schema.id, "json")}
                            style={{
                              padding: "6px 14px",
                              borderRadius: "6px",
                              border: "none",
                              cursor: "pointer",
                              background: schema.mode === "json" ? "#000000" : "transparent",
                              color: schema.mode === "json" ? "#ffffff" : "#303030",
                              fontWeight: "bold",
                            }}
                          >
                            Direct JSON
                          </button>
                        </div>
                      </div>
                    </div>

                    <s-paragraph tone="subdued">
                      {getSchemaDescription(toSchemaType(schema.type))}
                    </s-paragraph>

                    {schema.mode === "json" && (
                      <s-stack direction="block" gap="base" style={{ marginTop: "12px" }}>
                        <s-paragraph tone="subdued">
                          Paste complete JSON-LD below. It is injected exactly as written.
                        </s-paragraph>
                        <textarea
                          value={schema.data?.json || ""}
                          onChange={(e) => handleSchemaFieldChange(schema.id, "json", e.target.value)}
                          rows={12}
                          style={{
                            width: "100%",
                            minHeight: "260px",
                            fontFamily: "monospace, 'Fira Code', 'Courier New', monospace",
                            fontSize: "13px",
                            lineHeight: "1.5",
                            padding: "12px",
                            borderRadius: "8px",
                            border: "1px solid #c9cccf",
                            backgroundColor: "#fafafa",
                            whiteSpace: "pre",
                            overflowX: "auto",
                            boxSizing: "border-box",
                            resize: "vertical",
                          }}
                          placeholder={`{ "@context": "https://schema.org", "@type": "${toSchemaType(schema.type) || 'LocalBusiness'}", "name": "My Business" }`}
                        />
                      </s-stack>
                    )}

                    {schema.mode === "form" && (
                      <s-stack direction="block" gap="base" style={{ marginTop: "12px" }}>
                        {schema.type === "local_business" && (
                          <>
                            <s-stack direction="inline" blockAlign="center" gap="base" style={{ flexWrap: "wrap" }}>
                              <div style={{ flex: "1 1 45%", minWidth: "200px" }}>
                                <s-text-field label="Business Name" value={schema.data?.name || ""} onChange={(e) => handleSchemaFieldChange(schema.id, "name", e.target.value)} />
                              </div>
                              <div style={{ flex: "1 1 45%", minWidth: "200px" }}>
                                <s-text-field label="Website URL" value={schema.data?.url || ""} onChange={(e) => handleSchemaFieldChange(schema.id, "url", e.target.value)} />
                              </div>
                            </s-stack>
                            <s-text-field label="Business Description" value={schema.data?.description || ""} onChange={(e) => handleSchemaFieldChange(schema.id, "description", e.target.value)} multiline={3} />
                            <s-stack direction="inline" blockAlign="center" gap="base" style={{ flexWrap: "wrap" }}>
                              <div style={{ flex: "1 1 45%", minWidth: "200px" }}>
                                <s-text-field label="Logo / Image URL" value={schema.data?.logoUrl || ""} onChange={(e) => handleSchemaFieldChange(schema.id, "logoUrl", e.target.value)} />
                              </div>
                              <div style={{ flex: "1 1 45%", minWidth: "200px" }}>
                                <s-text-field label="Telephone" value={schema.data?.telephone || ""} onChange={(e) => handleSchemaFieldChange(schema.id, "telephone", e.target.value)} />
                              </div>
                            </s-stack>
                            <s-text-field label="Price Range" value={schema.data?.priceRange || ""} onChange={(e) => handleSchemaFieldChange(schema.id, "priceRange", e.target.value)} placeholder="e.g., $" />
                            <s-text-field label="Street Address" value={schema.data?.street || ""} onChange={(e) => handleSchemaFieldChange(schema.id, "street", e.target.value)} />
                            <s-stack direction="inline" blockAlign="center" gap="base" style={{ flexWrap: "wrap" }}>
                              <div style={{ flex: "1 1 30%", minWidth: "150px" }}>
                                <s-text-field label="City" value={schema.data?.city || ""} onChange={(e) => handleSchemaFieldChange(schema.id, "city", e.target.value)} />
                              </div>
                              <div style={{ flex: "1 1 30%", minWidth: "150px" }}>
                                <s-text-field label="State / Region" value={schema.data?.state || ""} onChange={(e) => handleSchemaFieldChange(schema.id, "state", e.target.value)} />
                              </div>
                              <div style={{ flex: "1 1 30%", minWidth: "150px" }}>
                                <s-text-field label="Postal Code" value={schema.data?.postalCode || ""} onChange={(e) => handleSchemaFieldChange(schema.id, "postalCode", e.target.value)} />
                              </div>
                            </s-stack>
                            <s-stack direction="inline" blockAlign="center" gap="base" style={{ flexWrap: "wrap" }}>
                              <div style={{ flex: "1 1 45%", minWidth: "200px" }}>
                                <s-text-field label="Country" value={schema.data?.country || ""} onChange={(e) => handleSchemaFieldChange(schema.id, "country", e.target.value)} />
                              </div>
                              <div style={{ flex: "1 1 45%", minWidth: "200px" }}>
                                <s-text-field label="Latitude" value={schema.data?.latitude || ""} onChange={(e) => handleSchemaFieldChange(schema.id, "latitude", e.target.value)} />
                              </div>
                              <div style={{ flex: "1 1 45%", minWidth: "200px" }}>
                                <s-text-field label="Longitude" value={schema.data?.longitude || ""} onChange={(e) => handleSchemaFieldChange(schema.id, "longitude", e.target.value)} />
                              </div>
                            </s-stack>
                          </>
                        )}
                        
                        {schema.type === "product" && (
                          <>
                            <s-stack direction="inline" blockAlign="center" gap="base" style={{ flexWrap: "wrap" }}>
                              <div style={{ flex: "1 1 45%", minWidth: "200px" }}>
                                <s-text-field label="Product Name" value={schema.data?.name || ""} onChange={(e) => handleSchemaFieldChange(schema.id, "name", e.target.value)} placeholder="Product Name" />
                              </div>
                              <div style={{ flex: "1 1 45%", minWidth: "200px" }}>
                                <s-text-field label="Product URL" value={schema.data?.url || ""} onChange={(e) => handleSchemaFieldChange(schema.id, "url", e.target.value)} placeholder="https://" />
                              </div>
                            </s-stack>
                            <s-text-field label="Description" value={schema.data?.description || ""} onChange={(e) => handleSchemaFieldChange(schema.id, "description", e.target.value)} placeholder="Description" multiline={3} />
                            <s-stack direction="inline" blockAlign="center" gap="base" style={{ flexWrap: "wrap" }}>
                              <div style={{ flex: "1 1 45%", minWidth: "200px" }}>
                                <s-text-field label="Image URL" value={schema.data?.imageUrl || ""} onChange={(e) => handleSchemaFieldChange(schema.id, "imageUrl", e.target.value)} placeholder="https://" />
                              </div>
                              <div style={{ flex: "1 1 45%", minWidth: "200px" }}>
                                <s-text-field label="Brand" value={schema.data?.brand || ""} onChange={(e) => handleSchemaFieldChange(schema.id, "brand", e.target.value)} placeholder="Brand" />
                              </div>
                            </s-stack>
                            <s-stack direction="inline" blockAlign="center" gap="base" style={{ flexWrap: "wrap" }}>
                              <div style={{ flex: "1 1 50%", minWidth: "200px" }}>
                                <s-text-field label="Regular Price" value={schema.data?.price || ""} onChange={(e) => handleSchemaFieldChange(schema.id, "price", e.target.value)} placeholder="e.g., 99.99" type="number" step="0.01" />
                              </div>
                              <div style={{ flex: "1 1 50%", minWidth: "200px" }}>
                                <s-text-field label="Sale / Offer Price" value={schema.data?.salePrice || ""} onChange={(e) => handleSchemaFieldChange(schema.id, "salePrice", e.target.value)} placeholder="e.g., 79.99" type="number" step="0.01" helperText="Optional. If set, this price will be used in the schema." />
                              </div>
                            </s-stack>
                            <div style={{ display: "flex", gap: "16px", width: "100%", marginTop: "12px" }}>
                              <div style={{ flex: "1 1 50%", width: "50%" }}>
                                <label style={{ display: "block", marginBottom: "6px", fontWeight: "bold" }}>SKU</label>
                                <s-text-field value={schema.data?.sku || ""} onChange={(e) => handleSchemaFieldChange(schema.id, "sku", e.target.value)} placeholder="SKU" />
                              </div>
                              <div style={{ flex: "1 1 50%", width: "50%" }}>
                                <label style={{ display: "block", marginBottom: "6px", fontWeight: "bold" }}>Currency</label>
                                <SearchableCurrencySelect value={schema.data?.currency || "USD"} onChange={(val) => handleSchemaFieldChange(schema.id, "currency", val)} />
                              </div>
                            </div>
                          </>
                        )}

                        {schema.type === "organization" && (
                          <>
                            <s-stack direction="inline" blockAlign="center" gap="base" style={{ flexWrap: "wrap" }}>
                              <div style={{ flex: "1 1 45%", minWidth: "200px" }}>
                                <s-text-field label="Organization Name" value={schema.data?.name || ""} onChange={(e) => handleSchemaFieldChange(schema.id, "name", e.target.value)} />
                              </div>
                              <div style={{ flex: "1 1 45%", minWidth: "200px" }}>
                                <s-text-field label="Website URL" value={schema.data?.url || ""} onChange={(e) => handleSchemaFieldChange(schema.id, "url", e.target.value)} />
                              </div>
                            </s-stack>
                            <s-text-field label="Description" value={schema.data?.description || ""} onChange={(e) => handleSchemaFieldChange(schema.id, "description", e.target.value)} multiline={3} />
                            <s-stack direction="inline" blockAlign="center" gap="base" style={{ flexWrap: "wrap" }}>
                              <div style={{ flex: "1 1 45%", minWidth: "200px" }}>
                                <s-text-field label="Logo / Image URL" value={schema.data?.logoUrl || ""} onChange={(e) => handleSchemaFieldChange(schema.id, "logoUrl", e.target.value)} />
                              </div>
                              <div style={{ flex: "1 1 45%", minWidth: "200px" }}>
                                <s-text-field label="Logo URL" value={schema.data?.logoUrl || ""} onChange={(e) => handleSchemaFieldChange(schema.id, "logoUrl", e.target.value)} />
                              </div>
                            </s-stack>
                            <s-text-field label="Telephone" value={schema.data?.telephone || ""} onChange={(e) => handleSchemaFieldChange(schema.id, "telephone", e.target.value)} />
                            <s-text-field label="Street Address" value={schema.data?.street || ""} onChange={(e) => handleSchemaFieldChange(schema.id, "street", e.target.value)} />
                            <s-stack direction="inline" blockAlign="center" gap="base" style={{ flexWrap: "wrap" }}>
                              <div style={{ flex: "1 1 30%", minWidth: "150px" }}>
                                <s-text-field label="City" value={schema.data?.city || ""} onChange={(e) => handleSchemaFieldChange(schema.id, "city", e.target.value)} />
                              </div>
                              <div style={{ flex: "1 1 30%", minWidth: "150px" }}>
                                <s-text-field label="State / Region" value={schema.data?.state || ""} onChange={(e) => handleSchemaFieldChange(schema.id, "state", e.target.value)} />
                              </div>
                              <div style={{ flex: "1 1 30%", minWidth: "150px" }}>
                                <s-text-field label="Postal Code" value={schema.data?.postalCode || ""} onChange={(e) => handleSchemaFieldChange(schema.id, "postalCode", e.target.value)} />
                              </div>
                            </s-stack>
                            <s-text-field label="Country" value={schema.data?.country || ""} onChange={(e) => handleSchemaFieldChange(schema.id, "country", e.target.value)} />
                          </>
                        )}

                          {schema.type === "service" && (
                            <>
                              <s-text-field label="Service Name" value={schema.data?.name || ""} onChange={(e) => handleSchemaFieldChange(schema.id, "name", e.target.value)} />
                              <s-text-field label="URL" value={schema.data?.url || ""} onChange={(e) => handleSchemaFieldChange(schema.id, "url", e.target.value)} />
                              <s-text-field label="Description" value={schema.data?.description || ""} onChange={(e) => handleSchemaFieldChange(schema.id, "description", e.target.value)} multiline={3} />
                              <s-text-field label="Image URL" value={schema.data?.imageUrl || ""} onChange={(e) => handleSchemaFieldChange(schema.id, "imageUrl", e.target.value)} />
                            </>
                          )}

                           {schema.type === "person" && (
                             <>
                               <s-text-field label="Full Name" value={schema.data?.name || ""} onChange={(e) => handleSchemaFieldChange(schema.id, "name", e.target.value)} placeholder="Full Name" />
                               <s-text-field label="Profile URL" value={schema.data?.url || ""} onChange={(e) => handleSchemaFieldChange(schema.id, "url", e.target.value)} placeholder="https://" />
                               <s-text-field label="Description" value={schema.data?.description || ""} onChange={(e) => handleSchemaFieldChange(schema.id, "description", e.target.value)} placeholder="Description" multiline={3} />
                               <s-text-field label="Photo URL" value={schema.data?.imageUrl || ""} onChange={(e) => handleSchemaFieldChange(schema.id, "imageUrl", e.target.value)} placeholder="https://" />
                               <s-text-field label="Job Title" value={schema.data?.jobTitle || ""} onChange={(e) => handleSchemaFieldChange(schema.id, "jobTitle", e.target.value)} placeholder="Job Title" />
                             </>
                           )}

                            {schema.type === "breadcrumb_list" && (
                              <>
                                <s-paragraph tone="subdued">
                                  Navigation breadcrumbs schema specifying page hierarchy and links.
                                </s-paragraph>
                                {(schema.data?.items || []).map((item, index) => (
                                  <s-box key={index} padding="base" borderWidth="base" borderRadius="base" background="subdued" style={{ marginBottom: "12px" }}>
                                    <s-stack direction="block" gap="base">
                                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                        <s-text type="strong">BREADCRUMB ITEM</s-text>
                                        <s-button variant="secondary" tone="critical" onClick={() => handleRemoveBreadcrumbItem(schema.id, index)}>✕ Remove</s-button>
                                      </div>
                                      <s-text-field label="Page Name" value={item.name || ""} onChange={(e) => handleBreadcrumbItemChange(schema.id, index, "name", e.target.value)} placeholder="Page Name (e.g. Home, Category)" />
                                      <s-text-field label="URL" value={item.url || ""} onChange={(e) => handleBreadcrumbItemChange(schema.id, index, "url", e.target.value)} placeholder="URL (e.g. https://example.com)" />
                                    </s-stack>
                                  </s-box>
                                ))}
                                <s-button variant="secondary" onClick={() => handleAddBreadcrumbItem(schema.id)}>+ Add Breadcrumb Item</s-button>
                                <s-paragraph tone="subdued">Add each breadcrumb item in order (e.g. Home, Category, Current Page).</s-paragraph>
                              </>
                            )}

                             {schema.type === "web_page" && (
                               <>
                                 <s-text-field label="Page Name" value={schema.data?.name || ""} onChange={(e) => handleSchemaFieldChange(schema.id, "name", e.target.value)} placeholder="Page Name" />
                                 <s-text-field label="Page URL" value={schema.data?.url || ""} onChange={(e) => handleSchemaFieldChange(schema.id, "url", e.target.value)} placeholder="https://" />
                                 <s-text-field label="Description" value={schema.data?.description || ""} onChange={(e) => handleSchemaFieldChange(schema.id, "description", e.target.value)} placeholder="Description" multiline={3} />
                                 <s-text-field label="Image URL" value={schema.data?.imageUrl || ""} onChange={(e) => handleSchemaFieldChange(schema.id, "imageUrl", e.target.value)} placeholder="https://" />
                               </>
                             )}

                             {schema.type === "web_site" && (
                               <>
                                 <s-paragraph tone="subdued">
                                   Represents the whole website. Often used together with a Sitelinks SearchBox action.
                                 </s-paragraph>
                                 <s-text-field label="Site Name" value={schema.data?.name || ""} onChange={(e) => handleSchemaFieldChange(schema.id, "name", e.target.value)} placeholder="Site Name" />
                                 <s-text-field label="Site URL" value={schema.data?.url || ""} onChange={(e) => handleSchemaFieldChange(schema.id, "url", e.target.value)} placeholder="https://" />
                                 <s-text-field label="Description" value={schema.data?.description || ""} onChange={(e) => handleSchemaFieldChange(schema.id, "description", e.target.value)} placeholder="Description" multiline={3} />
                                 <s-text-field label="Image URL" value={schema.data?.imageUrl || ""} onChange={(e) => handleSchemaFieldChange(schema.id, "imageUrl", e.target.value)} placeholder="https://" />
                               </>
                             )}

                             {schema.type === "faq_page" && (
                           <>
                             <s-paragraph tone="subdued">
                               A list of questions and answers. Each pair becomes a Question / acceptedAnswer entry inside an FAQPage schema.
                             </s-paragraph>
                             {(schema.data?.items || []).map((item, index) => (
                               <s-box key={index} padding="base" borderWidth="base" borderRadius="base" background="subdued" style={{ marginBottom: "12px" }}>
                                 <s-stack direction="block" gap="base">
                                   <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                     <s-text type="strong">QUESTION & ANSWER</s-text>
                                     <s-button variant="secondary" tone="critical" onClick={() => handleRemoveFaqItem(schema.id, index)}>✕ Remove</s-button>
                                   </div>
                                   <s-text-field label="Question" value={item.question || ""} onChange={(e) => handleFaqItemChange(schema.id, index, "question", e.target.value)} placeholder="Question" />
                                   <s-text-field label="Answer" value={item.answer || ""} onChange={(e) => handleFaqItemChange(schema.id, index, "answer", e.target.value)} placeholder="Answer" multiline={3} />
                                 </s-stack>
                               </s-box>
                             ))}
                             <s-button variant="secondary" onClick={() => handleAddFaqItem(schema.id)}>+ Add Question</s-button>
                             <s-paragraph tone="subdued">These power both the FAQPage schema. Keep answers clear and concise.</s-paragraph>
                           </>
                         )}

                         {schema.type === "event" && (
                           <>
                             <s-text-field label="Event Name" value={schema.data?.name || ""} onChange={(e) => handleSchemaFieldChange(schema.id, "name", e.target.value)} placeholder="Event Name" />
                             <s-text-field label="Event URL" value={schema.data?.url || ""} onChange={(e) => handleSchemaFieldChange(schema.id, "url", e.target.value)} placeholder="https://" />
                             <s-text-field label="Description" value={schema.data?.description || ""} onChange={(e) => handleSchemaFieldChange(schema.id, "description", e.target.value)} placeholder="Description" multiline={3} />
                             <s-text-field label="Image URL" value={schema.data?.imageUrl || ""} onChange={(e) => handleSchemaFieldChange(schema.id, "imageUrl", e.target.value)} placeholder="https://" />
                             <div style={{ display: "flex", gap: "16px", width: "100%" }}>
                               <div style={{ flex: "1" }}>
                                 <label style={{ display: "block", marginBottom: "6px", fontWeight: "bold" }}>Start Date</label>
                                 <input
                                   type="date"
                                   value={schema.data?.startDate || ""}
                                   onChange={(e) => handleSchemaFieldChange(schema.id, "startDate", e.target.value)}
                                   style={{ padding: "8px 12px", borderRadius: "6px", border: "1px solid #c9cccf", background: "#fff", fontSize: "14px", width: "100%", boxSizing: "border-box" }}
                                 />
                               </div>
                               <div style={{ flex: "1" }}>
                                 <label style={{ display: "block", marginBottom: "6px", fontWeight: "bold" }}>End Date</label>
                                 <input
                                   type="date"
                                   value={schema.data?.endDate || ""}
                                   onChange={(e) => handleSchemaFieldChange(schema.id, "endDate", e.target.value)}
                                   style={{ padding: "8px 12px", borderRadius: "6px", border: "1px solid #c9cccf", background: "#fff", fontSize: "14px", width: "100%", boxSizing: "border-box" }}
                                 />
                               </div>
                             </div>
                             <s-text-field label="Location Name" value={schema.data?.location || ""} onChange={(e) => handleSchemaFieldChange(schema.id, "location", e.target.value)} placeholder="Location Name" />
                           </>
                         )}

                         {schema.type === "article" && (
                          <>
                            <s-text-field label="Headline" value={schema.data?.headline || ""} onChange={(e) => handleSchemaFieldChange(schema.id, "headline", e.target.value)} placeholder="Headline" />
                            <s-text-field label="Article URL" value={schema.data?.url || ""} onChange={(e) => handleSchemaFieldChange(schema.id, "url", e.target.value)} placeholder="https://" />
                            <s-text-field label="Description" value={schema.data?.description || ""} onChange={(e) => handleSchemaFieldChange(schema.id, "description", e.target.value)} placeholder="Description" multiline={3} />
                            <s-text-field label="Featured Image URL" value={schema.data?.imageUrl || ""} onChange={(e) => handleSchemaFieldChange(schema.id, "imageUrl", e.target.value)} placeholder="https://" />
                            <div style={{ display: "flex", gap: "16px", width: "100%", marginTop: "12px" }}>
                              <div style={{ flex: "1 1 50%", width: "50%" }}>
                                <s-text-field label="Author Name" value={schema.data?.author || ""} onChange={(e) => handleSchemaFieldChange(schema.id, "author", e.target.value)} placeholder="Author Name" />
                              </div>
                              <div style={{ flex: "1 1 50%", width: "50%" }}>
                                <label style={{ display: "block", marginBottom: "6px", fontWeight: "bold" }}>Date Published</label>
                                <input
                                  type="date"
                                  value={schema.data?.date || ""}
                                  onChange={(e) => handleSchemaFieldChange(schema.id, "date", e.target.value)}
                                  style={{ padding: "8px 12px", borderRadius: "6px", border: "1px solid #c9cccf", background: "#fff", fontSize: "14px", width: "100%", boxSizing: "border-box" }}
                                />
                              </div>
                            </div>
                          </>
                        )}

                        <s-box padding="base" borderWidth="base" borderRadius="base" background="subdued">
                          <s-stack direction="block" gap="base">
                            <s-text type="strong">Custom Properties (optional JSON)</s-text>
                            <s-paragraph tone="subdued">Merged into the schema. Use for anything the form does not cover.</s-paragraph>
                            <s-text-field
                              label="JSON"
                              value={schema.data?.customJson || ""}
                              onChange={(e) => handleSchemaFieldChange(schema.id, "customJson", e.target.value)}
                              multiline={4}
                              style={{ fontFamily: "monospace" }}
                            />
                          </s-stack>
                        </s-box>
                       </s-stack>
                  )}
                </s-stack>
                </div>
              ))}
            </s-stack>

            {addedSchemas.length === 0 && (
              <s-paragraph tone="subdued">
                No schemas yet. Click + Add Schema, pick a type (e.g., FAQ Page), and fill in the fields.
              </s-paragraph>
            )}

            <s-stack direction="inline" gap="base" style={{ marginTop: "16px" }}>
              <s-button variant="primary" onClick={handleAddSchema}>+ Add Schema</s-button>
            </s-stack>
          </s-stack>
        </s-section>
      </>
      )}

      {activeGroup && (
          <>
            {/* Step 4: Save Data */}
            <s-section heading="4. Save Data">
              <s-stack direction="block" gap="base">
                <s-paragraph>
                  Save your schema group, toggle its active status, or delete it permanently.
                </s-paragraph>

                <s-stack direction="inline" gap="base" style={{ marginTop: "16px" }}>
                  <s-button variant="primary" onClick={handleSaveGroup}>Save Schema</s-button>

                  <s-button
                    variant={isActive ? "secondary" : "primary"}
                    onClick={handleToggleActive}
                  >
                    {isActive ? "Deactivate" : "Activate"}
                  </s-button>

                  <s-button variant="secondary" tone="critical" onClick={handleDeleteGroup}>
                    Delete Schema Group
                  </s-button>
                </s-stack>

                {notice && (
                  <s-banner
                    tone={getBannerTone(notice)}
                    onDismiss={() => setNotice("")}
                    style={{ marginTop: "12px" }}
                  >
                    {notice}
                  </s-banner>
                )}
              </s-stack>
            </s-section>
          </>
        )}

        {showDeleteModal && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "rgba(0,0,0,0.5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 9999,
            }}
            onClick={() => setShowDeleteModal(false)}
          >
            <div
              style={{
                background: "#fff",
                borderRadius: "8px",
                padding: "24px",
                maxWidth: "480px",
                width: "90%",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 style={{ marginTop: 0, marginBottom: "12px" }}>Delete Schema Group</h3>
              <p style={{ marginBottom: "24px", color: "#6d7175" }}>
                Are you sure you want to delete this schema group? This will remove all your schema data from your selected page, product, or post!
              </p>
              <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end" }}>
                <s-button variant="secondary" onClick={() => setShowDeleteModal(false)}>Cancel</s-button>
                <s-button variant="primary" tone="critical" onClick={handleConfirmDelete}>Confirm Delete</s-button>
              </div>
            </div>
          </div>
        )}
      </s-page>
  );
}

export const headers = (headersArgs) => {
  return boundary.headers(headersArgs);
};

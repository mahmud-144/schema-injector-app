import { useState, useEffect } from "react";
import { useFetcher } from "react-router";
import { useAppBridge } from "@shopify/app-bridge-react";
import { boundary } from "@shopify/shopify-app-react-router/server";
import { authenticate } from "../shopify.server";
import { saveSimpleSchemaMetafield } from "../schema.server";

export const loader = async ({ request }) => {
  await authenticate.admin(request);
  const { session } = await authenticate.admin(request);
  return { shop: session.shop };
};

export const action = async ({ request }) => {
  const { session, admin } = await authenticate.admin(request);
  const formData = await request.formData();
  const actionType = formData.get("action");

  if (actionType === "searchProducts") {
    const query = formData.get("query")?.toString().trim() || "";

    const graphqlQuery = `#graphql
      query getProducts($first: Int!, $query: String) {
        products(first: $first, query: $query) {
          edges {
            node {
              id
              title
              handle
            }
          }
        }
      }`;

    try {
      const response = await admin.graphql(graphqlQuery, {
        variables: { first: 10, query: query || null },
      });
      const json = await response.json();

      if (json.errors) {
        return { error: "Shopify API Error: " + (json.errors[0]?.message || "Unknown error") };
      }

      const toNumericId = (gid) => {
        if (!gid || typeof gid !== "string") return gid;
        const parts = gid.split("/");
        return parts[parts.length - 1] || gid;
      };

      const products = json.data?.products?.edges?.map((e) => ({
        id: toNumericId(e.node.id),
        title: e.node.title || e.node.handle || e.node.id,
      })) || [];

      return { products };
    } catch (err) {
      return { error: "Failed to search products: " + (err.message || err) };
    }
  }

  if (actionType === "saveSimpleSchema") {
    const targetType = formData.get("targetType")?.toString() || "shop";
    const productId = formData.get("productId")?.toString() || "";
    const jsonLd = formData.get("jsonLd")?.toString() || "";

    if (!jsonLd.trim()) {
      return { error: "JSON-LD schema is required" };
    }

    if (targetType === "product" && !productId) {
      return { error: "Please select a product for product-level injection" };
    }

    await saveSimpleSchemaMetafield(admin, session.shop, targetType, productId, jsonLd);
    return { success: true, message: "Schema saved successfully!" };
  }

  return { error: "Invalid action" };
};

const SCHEMA_TEMPLATES = {
  Product: {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Product Name",
    image: "https://example.com/image.jpg",
    description: "Product description goes here",
    sku: "SKU-123",
    brand: {
      "@type": "Brand",
      name: "Brand Name",
    },
    offers: {
      "@type": "Offer",
      price: "99.99",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
  },
  Organization: {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Organization Name",
    url: "https://example.com",
    logo: "https://example.com/logo.png",
    description: "Organization description",
    telephone: "+1-234-567-8900",
  },
  LocalBusiness: {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Business Name",
    image: "https://example.com/photo.jpg",
    priceRange: "$$",
    telephone: "+1-234-567-8900",
    address: {
      "@type": "PostalAddress",
      streetAddress: "123 Main St",
      addressLocality: "City",
      addressRegion: "State",
      postalCode: "12345",
      addressCountry: "US",
    },
  },
  WebSite: {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Site Name",
    url: "https://example.com",
    description: "Site description",
  },
  FAQPage: {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Question 1?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Answer 1",
        },
      },
    ],
  },
  BreadcrumbList: {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://example.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Category",
        item: "https://example.com/category",
      },
    ],
  },
  Article: {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Article Headline",
    image: "https://example.com/article-image.jpg",
    author: {
      "@type": "Person",
      name: "Author Name",
    },
    datePublished: "2025-01-01",
    description: "Article description",
  },
  Service: {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Service Name",
    description: "Service description",
    url: "https://example.com",
    image: "https://example.com/service-image.jpg",
  },
};

export default function SchemaConfig() {
  const fetcher = useFetcher();
  const shopify = useAppBridge();
  const [targetType, setTargetType] = useState("shop");
  const [productSearch, setProductSearch] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [showProductDropdown, setShowProductDropdown] = useState(false);
  const [jsonLd, setJsonLd] = useState("");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    if (fetcher.data?.products) {
      setProducts(fetcher.data.products);
      setShowProductDropdown(true);
    }
    if (fetcher.data?.error) {
      shopify.toast.show(fetcher.data.error);
      setNotice(fetcher.data.error);
      setTimeout(() => setNotice(""), 3000);
    }
    if (fetcher.data?.success && fetcher.data?.message) {
      shopify.toast.show(fetcher.data.message);
      setNotice(fetcher.data.message);
      setTimeout(() => setNotice(""), 3000);
      setJsonLd("");
      setProductSearch("");
      setSelectedProduct(null);
      setProducts([]);
      setShowProductDropdown(false);
    }
  }, [fetcher.data, shopify]);

  const handleProductSearch = (value) => {
    setProductSearch(value);
    setSelectedProduct(null);
    if (value.trim().length >= 2) {
      const fd = new FormData();
      fd.append("action", "searchProducts");
      fd.append("query", value);
      fetcher.submit(fd, { method: "post" });
    } else {
      setProducts([]);
      setShowProductDropdown(false);
    }
  };

  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
    setProductSearch(product.title);
    setShowProductDropdown(false);
  };

  const handleGenerateTemplate = (type) => {
    const template = SCHEMA_TEMPLATES[type];
    if (template) {
      setJsonLd(JSON.stringify(template, null, 2));
    }
  };

  const handleSave = () => {
    const fd = new FormData();
    fd.append("action", "saveSimpleSchema");
    fd.append("targetType", targetType);
    if (targetType === "product" && selectedProduct) {
      fd.append("productId", selectedProduct.id);
    }
    fd.append("jsonLd", jsonLd);
    fetcher.submit(fd, { method: "post" });
  };

  const getBannerTone = (msg) => {
    const lower = (msg || "").toLowerCase();
    if (lower.includes("error")) {
      return "critical";
    }
    return "success";
  };

  return (
    <s-page heading="Schema Configuration">
      {notice && (
        <s-banner tone={getBannerTone(notice)} onDismiss={() => setNotice("")}>
          {notice}
        </s-banner>
      )}

      <s-section heading="1. Schema Target">
        <s-stack direction="block" gap="base">
          <s-paragraph>
            Choose where to inject your JSON-LD schema. Select a specific product for product-level injection, or choose Global Shop to inject into all pages.
          </s-paragraph>
          <s-select
            label="Target Type"
            value={targetType}
            onChange={(e) => {
              setTargetType(e.target.value);
              setSelectedProduct(null);
              setProductSearch("");
              setProducts([]);
              setShowProductDropdown(false);
            }}
          >
            <s-option value="shop">Global Shop</s-option>
            <s-option value="product">Product</s-option>
          </s-select>

          {targetType === "product" && (
            <div style={{ position: "relative" }}>
              <s-text-field
                label="Search Product"
                value={productSearch}
                onChange={(e) => handleProductSearch(e.target.value)}
                placeholder="Search products by name..."
                autoComplete="off"
              />
              {showProductDropdown && products.length > 0 && (
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
                  {products.map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => handleSelectProduct(p)}
                      style={{
                        padding: "10px 14px",
                        cursor: "pointer",
                        border: "none",
                        borderBottom: "1px solid #e1e3e5",
                        background: selectedProduct?.id === p.id ? "#f0f0f0" : "transparent",
                        width: "100%",
                        textAlign: "left",
                        fontSize: "14px",
                      }}
                    >
                      {p.title}
                    </button>
                  ))}
                </div>
              )}
              {selectedProduct && (
                <s-paragraph tone="subdued" style={{ marginTop: "8px" }}>
                  Selected: <strong>{selectedProduct.title}</strong> (ID: {selectedProduct.id})
                </s-paragraph>
              )}
            </div>
          )}
        </s-stack>
      </s-section>

      <s-section heading="2. JSON-LD Schema">
        <s-stack direction="block" gap="base">
          <s-paragraph>
            Paste your JSON-LD schema below, or generate a template to get started quickly.
          </s-paragraph>
          <s-stack direction="inline" gap="base" blockAlign="center">
            <s-select
              label="Generate Template"
              value=""
              onChange={(e) => {
                if (e.target.value) {
                  handleGenerateTemplate(e.target.value);
                }
              }}
            >
              <s-option value="" disabled>
                Select a schema type...
              </s-option>
              <s-option value="Product">Product</s-option>
              <s-option value="Organization">Organization</s-option>
              <s-option value="LocalBusiness">Local Business</s-option>
              <s-option value="WebSite">Web Site</s-option>
              <s-option value="FAQPage">FAQ Page</s-option>
              <s-option value="BreadcrumbList">Breadcrumb List</s-option>
              <s-option value="Article">Article</s-option>
              <s-option value="Service">Service</s-option>
            </s-select>
          </s-stack>
          <textarea
            value={jsonLd}
            onChange={(e) => setJsonLd(e.target.value)}
            rows={16}
            style={{
              width: "100%",
              minHeight: "300px",
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
            placeholder={`{ "@context": "https://schema.org", "@type": "Product", "name": "My Product" }`}
          />
        </s-stack>
      </s-section>

      <s-section heading="3. Save Schema">
        <s-stack direction="inline" gap="base">
          <s-button variant="primary" onClick={handleSave} disabled={fetcher.state !== "idle"}>
            {fetcher.state !== "idle" ? "Saving..." : "Save Schema"}
          </s-button>
        </s-stack>
      </s-section>
    </s-page>
  );
}

export const headers = (headersArgs) => {
  return boundary.headers(headersArgs);
};

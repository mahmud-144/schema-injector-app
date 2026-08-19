import { authenticate } from "../shopify.server";
import { getGroup } from "../schema.server";

export const loader = async ({ request, params }) => {
  await authenticate.admin(request);
  const { session } = await authenticate.admin(request);
  const slug = params.slug;

  if (!slug) {
    return new Response(JSON.stringify({ error: "Missing slug" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const group = await getGroup(session.shop, slug);
  if (!group) {
    return new Response(JSON.stringify({ error: "Group not found" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }

  if (!group.isActive) {
    return new Response(JSON.stringify({ error: "Group is not active" }), {
      status: 403,
      headers: { "Content-Type": "application/json" },
    });
  }

  const schemas = group.schemas || [];
  const targets = group.targets || [];
  const target = targets[0] || { injectType: "liquid_snippet", pageIds: "", postIds: "" };

  const schemaPayload = {
    slug: group.slug,
    name: group.name,
    isActive: group.isActive,
    targetType: target.injectType,
    targetPageIds: target.pageIds || "",
    targetPostIds: target.postIds || "",
    schemas: schemas.map((s) => {
      let json = "";
      try {
        if (s.mode === "json" && s.jsonContent) {
          json = s.jsonContent;
        } else if (s.formData) {
          const data = JSON.parse(s.formData);
          json = generateSchemaJsonLd(s.type, data);
        } else if (s.jsonContent) {
          json = s.jsonContent;
        }
      } catch {
        json = "";
      }
      return {
        type: s.type,
        name: s.name,
        mode: s.mode,
        json,
      };
    }),
    json: JSON.stringify(
      schemas.map((s) => {
        let json = "";
        try {
          if (s.mode === "json" && s.jsonContent) {
            json = s.jsonContent;
          } else if (s.formData) {
            const data = JSON.parse(s.formData);
            json = generateSchemaJsonLd(s.type, data);
          } else if (s.jsonContent) {
            json = s.jsonContent;
          }
        } catch {
          json = "";
        }
        return json;
      }).filter(Boolean),
      null,
      2
    ),
  };

  return new Response(JSON.stringify(schemaPayload), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};

function generateSchemaJsonLd(type, data) {
  const base = {
    "@context": "https://schema.org",
    "@type": toSchemaType(type) || type,
  };

  switch (type) {
    case "local_business": {
      const payload = { ...base };
      payload.name = data.name || "";
      payload.url = data.url || "";
      payload.description = data.description || "";
      payload.image = data.imageUrl || "";
      payload.telephone = data.telephone || "";
      payload.priceRange = data.priceRange || "";
      payload.address = {
        "@type": "PostalAddress",
        streetAddress: data.street || "",
        addressLocality: data.city || "",
        addressRegion: data.state || "",
        postalCode: data.postalCode || "",
        addressCountry: data.country || "",
      };
      payload.geo = data.latitude && data.longitude ? {
        "@type": "GeoCoordinates",
        latitude: data.latitude,
        longitude: data.longitude,
      } : undefined;
      Object.keys(payload).forEach((key) => (payload[key] === undefined || payload[key] === "") && delete payload[key]);
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
      Object.keys(payload).forEach((key) => (payload[key] === undefined || payload[key] === "") && delete payload[key]);
      return JSON.stringify(payload, null, 2);
    }
    case "service": {
      const payload = { ...base };
      payload.name = data.name || "";
      payload.url = data.url || "";
      payload.description = data.description || "";
      payload.image = data.imageUrl || "";
      Object.keys(payload).forEach((key) => (payload[key] === undefined || payload[key] === "") && delete payload[key]);
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
      Object.keys(payload).forEach((key) => (payload[key] === undefined || payload[key] === "") && delete payload[key]);
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
      Object.keys(payload).forEach((key) => (payload[key] === undefined || payload[key] === "") && delete payload[key]);
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
      Object.keys(payload).forEach((key) => (payload[key] === undefined || payload[key] === "") && delete payload[key]);
      return JSON.stringify(payload, null, 2);
    }
    case "person": {
      const payload = { ...base };
      payload.name = data.name || "";
      payload.url = data.url || "";
      payload.description = data.description || "";
      payload.image = data.imageUrl || "";
      payload.jobTitle = data.jobTitle || "";
      Object.keys(payload).forEach((key) => (payload[key] === undefined || payload[key] === "") && delete payload[key]);
      return JSON.stringify(payload, null, 2);
    }
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
      Object.keys(payload).forEach((key) => (payload[key] === undefined || payload[key] === "") && delete payload[key]);
      return JSON.stringify(payload, null, 2);
    }
    case "web_site": {
      const payload = { ...base };
      payload.name = data.name || "";
      payload.url = data.url || "";
      payload.description = data.description || "";
      payload.image = data.imageUrl || "";
      Object.keys(payload).forEach((key) => (payload[key] === undefined || payload[key] === "") && delete payload[key]);
      return JSON.stringify(payload, null, 2);
    }
    default:
      return JSON.stringify(base, null, 2);
  }
}

function toSchemaType(type) {
  const map = {
    local_business: "LocalBusiness",
    organization: "Organization",
    service: "Service",
    product: "Product",
    article: "Article",
    event: "Event",
    faq_page: "FAQPage",
    person: "Person",
    breadcrumb_list: "BreadcrumbList",
    web_page: "WebPage",
    web_site: "WebSite",
  };
  return map[type] || type;
}

const fs = require('fs');
const content = fs.readFileSync('app/routes/app._index.jsx', 'utf8');

const newGenerateJsonLd = `
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
        if (data.question || data.answer) {
          payload.mainEntity = {
            "@type": "Question",
            name: data.question || "",
            acceptedAnswer: {
              "@type": "Answer",
              text: data.answer || "",
            },
          };
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
        payload.offers = {
          "@type": "Offer",
          price: data.price || "",
          priceCurrency: data.currency || "USD",
          availability: "https://schema.org/InStock",
        };
        return JSON.stringify(payload, null, 2);
      }
      case "article": {
        const payload = { ...base };
        payload.headline = data.headline || "";
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
        payload.description = data.description || "";
        payload.image = data.imageUrl || "";
        return JSON.stringify(payload, null, 2);
      }
      case "person": {
        const payload = { ...base };
        payload.name = data.name || "";
        payload.description = data.description || "";
        payload.image = data.imageUrl || "";
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
        payload.itemListElement = [];
        return JSON.stringify(payload, null, 2);
      }
      case "web_page": {
        const payload = { ...base };
        payload.name = data.name || "";
        payload.description = data.description || "";
        payload.url = data.url || "";
        return JSON.stringify(payload, null, 2);
      }
      case "web_site": {
        const payload = { ...base };
        payload.name = data.name || "";
        payload.url = data.url || "";
        payload.description = data.description || "";
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
          } else {
            formData[key] = JSON.stringify(parsed[key]);
          }
        } else {
          formData[key] = parsed[key];
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
        return ["question", "answer"];
      case "product":
        return ["name", "url", "description", "image", "brand", "sku", "offers", "price", "currency"];
      case "article":
        return ["headline", "author", "datePublished"];
      case "event":
        return ["name", "description", "image"];
      case "person":
        return ["name", "description", "image"];
      case "organization":
        return ["name", "url", "description", "logo", "telephone", "address", "street", "city", "state", "postalCode", "country"];
      case "local_business":
        return ["name", "url", "description", "logo", "telephone", "priceRange", "image", "address", "street", "city", "state", "postalCode", "country", "geo", "latitude", "longitude"];
      case "service":
        return ["name", "url", "description", "image"];
      case "breadcrumb_list":
        return ["itemListElement"];
      case "web_page":
        return ["name", "description", "url"];
      case "web_site":
        return ["name", "url", "description"];
      default:
        return [];
    }
  };
`;

const startMarker = '  const generateProductJsonLd = (data) => {';
const endMarker = '  const shortcode = activeGroup ?';

const startIdx = content.indexOf(startMarker);
const endIdx = content.indexOf(endMarker);

if (startIdx === -1 || endIdx === -1) {
  console.log('Markers not found');
  process.exit(1);
}

const newContent = content.slice(0, startIdx) + newGenerateJsonLd + '\n\n' + content.slice(endIdx);
fs.writeFileSync('app/routes/app._index.jsx', newContent);
console.log('Replaced JSON generator successfully');

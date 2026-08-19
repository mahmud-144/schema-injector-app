import prisma from "./db.server";

export async function generateShortcode(shop, group) {
  const shortcode = `{% render 'ultimate-schema', group: '${group.slug}' %}`;
  return shortcode;
}

export async function getGroupByName(shop, name) {
  return prisma.schemaGroup.findFirst({
    where: { shop, name },
    include: {
      schemas: { orderBy: { sortOrder: "asc" } },
      targets: true,
    },
  });
}

export async function getGroups(shop) {
  return prisma.schemaGroup.findMany({
    where: { shop },
    orderBy: { updatedAt: "desc" },
    include: {
      schemas: { orderBy: { sortOrder: "asc" } },
      targets: true,
    },
  });
}

export async function getGroup(shop, slug) {
  return prisma.schemaGroup.findFirst({
    where: { shop, slug },
    include: {
      schemas: { orderBy: { sortOrder: "asc" } },
      targets: true,
    },
  });
}

export async function createGroup(shop, name, slug) {
  return prisma.schemaGroup.create({
    data: { shop, name, slug, isActive: true },
  });
}

export async function updateGroup(shop, slug, data) {
  return prisma.schemaGroup.updateMany({
    where: { shop, slug },
    data,
  });
}

export async function toggleGroupActive(shop, slug, isActive) {
  return prisma.schemaGroup.updateMany({
    where: { shop, slug },
    data: { isActive },
  });
}

export async function deleteGroup(shop, slug) {
  return prisma.schemaGroup.deleteMany({
    where: { shop, slug },
  });
}

export async function saveSchemas(groupId, schemas) {
  await prisma.schema.deleteMany({ where: { groupId } });
  for (let i = 0; i < schemas.length; i++) {
    const s = schemas[i];
    await prisma.schema.create({
      data: {
        groupId,
        type: s.type,
        name: s.name,
        mode: s.mode || "form",
        jsonContent: s.jsonContent || null,
        formData: s.formData || null,
        faqRows: s.faqRows || null,
        breadcrumbs: s.breadcrumbs || null,
        sortOrder: i,
      },
    });
  }
}

export async function saveTargets(groupId, injectType, pageIds, postIds) {
  await prisma.schemaTarget.deleteMany({ where: { groupId } });
  return prisma.schemaTarget.create({
    data: { groupId, injectType, pageIds, postIds },
  });
}

export async function duplicateGroup(shop, slug) {
  const group = await getGroup(shop, slug);
  if (!group) return null;
  const newSlug = `${slug}-copy-${Date.now()}`;
  const newGroup = await createGroup(shop, `${group.name} (Copy)`, newSlug);
  for (const s of group.schemas) {
    await prisma.schema.create({
      data: {
        groupId: newGroup.id,
        type: s.type,
        name: s.name,
        mode: s.mode,
        jsonContent: s.jsonContent,
        formData: s.formData,
        faqRows: s.faqRows,
        breadcrumbs: s.breadcrumbs,
        sortOrder: s.sortOrder,
      },
    });
  }
  if (group.targets.length > 0) {
    const t = group.targets[0];
    await prisma.schemaTarget.create({
      data: {
        groupId: newGroup.id,
        injectType: t.injectType,
        pageIds: t.pageIds,
        postIds: t.postIds,
      },
    });
  }
  return newGroup;
}

export async function getShopGid(admin) {
  const res = await admin.graphql(
    `#graphql
    query getShopId {
      shop {
        id
      }
    }`
  );
  const json = await res.json();
  return json?.data?.shop?.id || null;
}

export async function writeSchemaMetafields(admin, shop, group) {
  if (!group || !admin) return;

  const shopGid = await getShopGid(admin);
  if (!shopGid) {
    console.error("Failed to resolve shop GID");
    return;
  }

  const schemas = group.schemas || [];
  const targets = group.targets || [];
  if (schemas.length === 0) return;

  const target = targets[0] || { injectType: "liquid_snippet", pageIds: "", postIds: "" };
  const injectType = target.injectType || "liquid_snippet";

  const schemaPayload = {
    slug: group.slug,
    name: group.name,
    isActive: group.isActive ?? true,
    targetType: injectType,
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

  const schemaJsonString = JSON.stringify(schemaPayload);

  try {
    await admin.graphql(
      `#graphql
      mutation metafieldsSet($metafields: [MetafieldsSetInput!]!) {
        metafieldsSet(metafields: $metafields) {
          metafields {
            id
            namespace
            key
          }
          userErrors {
            field
            message
          }
        }
      }`,
      {
        variables: {
          metafields: [
            {
              ownerId: shopGid,
              namespace: "schema_injector",
              key: group.slug,
              value: schemaJsonString,
              type: "json",
            },
          ],
        },
      }
    );
  } catch (err) {
    console.error("Failed to write schema metafields:", err);
  }

  try {
    const allGroups = await prisma.schemaGroup.findMany({
      where: { shop },
      include: {
        schemas: { orderBy: { sortOrder: "asc" } },
        targets: true,
      },
    });

    const indexPayload = allGroups.map((g) => ({
      slug: g.slug,
      name: g.name,
      isActive: g.isActive ?? true,
    }));

    await admin.graphql(
      `#graphql
      mutation metafieldsSet($metafields: [MetafieldsSetInput!]!) {
        metafieldsSet(metafields: $metafields) {
          metafields {
            id
            namespace
            key
          }
          userErrors {
            field
            message
          }
        }
      }`,
      {
        variables: {
          metafields: [
            {
              ownerId: shopGid,
              namespace: "schema_injector",
              key: "index",
              value: JSON.stringify(indexPayload),
              type: "json",
            },
          ],
        },
      }
    );
  } catch (err) {
    console.error("Failed to write schema index metafield:", err);
  }
}

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

export async function saveSimpleSchemaMetafield(admin, shop, targetType, productId, jsonLd) {
  if (!admin || !jsonLd) return;

  let ownerId;
  if (targetType === "product" && productId) {
    ownerId = `gid://shopify/Product/${productId}`;
  } else {
    const shopGid = await getShopGid(admin);
    if (!shopGid) {
      console.error("Failed to resolve shop GID for simple schema metafield");
      return;
    }
    ownerId = shopGid;
  }

  await admin.graphql(
    `#graphql
    mutation metafieldsSet($metafields: [MetafieldsSetInput!]!) {
      metafieldsSet(metafields: $metafields) {
        metafields {
          id
          namespace
          key
        }
        userErrors {
          field
          message
        }
      }
    }`,
    {
      variables: {
        metafields: [
          {
            ownerId,
            namespace: "schema_injector",
            key: "json",
            value: jsonLd,
            type: "json",
          },
        ],
      },
    }
  );
}

export async function deleteSchemaMetafields(admin, shopGid, slug) {
  if (!admin || !slug || !shopGid) return;
  try {
    await admin.graphql(
      `#graphql
      mutation metafieldsDelete($metafieldIds: [ID!]!) {
        metafieldsDelete(metafieldIds: $metafieldIds) {
          deletedIds
          userErrors {
            field
            message
          }
        }
      }`,
      {
        variables: {
          metafieldIds: [
            `${shopGid}/namespaces/schema_injector/keys/${slug}`,
          ],
        },
      }
    );
  } catch (err) {
    console.error("Failed to delete schema metafields:", err);
  }
}

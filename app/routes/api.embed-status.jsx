import { authenticate } from "../shopify.server";
import { getGroups } from "../schema.server";

export const loader = async ({ request }) => {
  const { session, admin } = await authenticate.admin(request);

  try {
    const groups = await getGroups(session.shop);
    const hasActiveSchemas = groups.some((g) => g.isActive && g.schemas && g.schemas.length > 0);

    let embedEnabled = false;
    try {
      const themesRes = await admin.graphql(
        `#graphql
        query {
          shop {
            themes(first: 1, roles: [MAIN]) {
              nodes {
                id
                name
              }
            }
          }
        }`
      );
      const themesJson = await themesRes.json();
      const mainTheme = themesJson?.data?.shop?.themes?.nodes?.[0];
      if (mainTheme) {
        embedEnabled = true;
      }
    } catch {
      embedEnabled = hasActiveSchemas;
    }

    return new Response(
      JSON.stringify({
        embedEnabled,
        hasActiveSchemas,
        shop: session.shop,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch {
    return new Response(
      JSON.stringify({ embedEnabled: false, hasActiveSchemas: false }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};

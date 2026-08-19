import '@shopify/ui-extensions';

//@ts-ignore
declare module './src/ProductAction.jsx' {
  const shopify: import('@shopify/ui-extensions/admin.product-details.action.render').Api;
  const globalThis: { shopify: typeof shopify };
}

//@ts-ignore
declare module './src/ProductIndexAction.jsx' {
  const shopify: import('@shopify/ui-extensions/admin.product-index.action.render').Api;
  const globalThis: { shopify: typeof shopify };
}

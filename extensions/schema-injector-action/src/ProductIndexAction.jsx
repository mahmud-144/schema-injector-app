import { reactExtension } from '@shopify/ui-extensions/admin';
import { SharedAction } from './SharedAction.jsx';

export default reactExtension('admin.product-index.action.render', () => (
  <SharedAction target="admin.product-index.action.render" targetType="product" />
));

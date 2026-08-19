import { reactExtension } from '@shopify/ui-extensions/admin';
import { SharedAction } from './SharedAction.jsx';

export default reactExtension('admin.product-details.action.render', () => (
  <SharedAction target="admin.product-details.action.render" targetType="product" />
));

/* eslint-disable react/prop-types */
import { useApi } from '@shopify/ui-extensions/admin';
import { useEffect } from 'react';

export function SharedAction({ target, targetType }) {
  const { open, close, data } = useApi(target);

  useEffect(() => {
    const resource = data?.selected?.[0];
    if (!resource?.id) return;

    const numericId = resource.id.split('/').pop() || resource.id;
    const targetTitle = resource.title || '';
    const url = `/app/all-schemas/create?targetType=${encodeURIComponent(targetType)}&targetId=${encodeURIComponent(numericId)}&targetTitle=${encodeURIComponent(targetTitle)}`;

    if (typeof open === 'function') {
      open(url);
    } else {
      window.open(url, '_blank');
    }
    close();
  }, [data, open, close, targetType]);

  return null;
}

const mapping: Record<string, string> = {
  items: 'item',
  'item-batches': 'item_batch',
  'item-categories': 'item_category',
  'item-types': 'item_type',
  people: 'people',
  transactions: 'transaction',
  universities: 'university',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}

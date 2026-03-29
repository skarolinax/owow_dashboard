import { mockGroupedUpdates } from '../data/mockUpdatesData.js';

export function getUpdateFeed() {
  return structuredClone(mockGroupedUpdates);
}

export function filterGroupedUpdates(grouped, query) {
  const q = query.trim().toLowerCase();
  if (!q) return grouped;

  const match = (item) => {
    const t = `${item.title} ${item.preview}`.toLowerCase();
    return t.includes(q);
  };

  return {
    today: grouped.today.filter(match),
    thisWeek: grouped.thisWeek.filter(match),
    earlier: grouped.earlier.filter(match),
  };
}

export function mapSlackMessagesToFeedItems(messages) {
  void messages;
  return [];
}

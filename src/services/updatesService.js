import { fetchSlackUpdates } from './slackService.js';

function getTimeGroup(isoTimestamp) {
  const d = new Date(isoTimestamp);
  const now = new Date();
  const startToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const endToday = new Date(startToday);
  endToday.setDate(endToday.getDate() + 1);

  if (d >= startToday && d < endToday) return 'today';

  const weekStart = startOfMonday(now);
  if (d >= weekStart && d < startToday) return 'thisWeek';

  return 'earlier';
}

function startOfMonday(d) {
  const x = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const day = x.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  x.setDate(x.getDate() + diff);
  x.setHours(0, 0, 0, 0);
  return x;
}

export function formatRelativeTime(isoTimestamp) {
  const then = new Date(isoTimestamp).getTime();
  const diffMs = Date.now() - then;
  if (diffMs < 0) return 'just now';

  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;

  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;

  const days = Math.floor(hrs / 24);
  if (days < 7) return `${days}d ago`;

  const weeks = Math.floor(days / 7);
  if (weeks < 52) return `${weeks}w ago`;

  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo ago`;

  const years = Math.floor(days / 365);
  return `${years}y ago`;
}

export function groupSlackUpdatesIntoFeed(dtos) {
  const today = [];
  const thisWeek = [];
  const earlier = [];

  for (const dto of dtos) {
    const timeGroup = getTimeGroup(dto.isoTimestamp);
    const item = {
      id: dto.id,
      timeGroup,
      title: dto.title,
      preview: dto.preview,
      relativeTime: formatRelativeTime(dto.isoTimestamp),
      isoTimestamp: dto.isoTimestamp,
      actionLabel: dto.actionLabel,
      actionUrl: dto.actionUrl,
      sourceKind: dto.sourceKind,
      source: dto.source,
      slackChannelId: dto.slackChannelId,
      slackMessageTs: dto.slackMessageTs,
      channelLabel: dto.channelLabel,
    };

    if (timeGroup === 'today') today.push(item);
    else if (timeGroup === 'thisWeek') thisWeek.push(item);
    else earlier.push(item);
  }

  const byDateDesc = (a, b) =>
    new Date(b.isoTimestamp).getTime() - new Date(a.isoTimestamp).getTime();
  today.sort(byDateDesc);
  thisWeek.sort(byDateDesc);
  earlier.sort(byDateDesc);

  return { today, thisWeek, earlier };
}

export async function loadSlackGroupedUpdates() {
  const { items } = await fetchSlackUpdates();
  return groupSlackUpdatesIntoFeed(items);
}

export function emptyGroupedUpdates() {
  return { today: [], thisWeek: [], earlier: [] };
}

/**
 * Cheap stable serialization to skip React state updates when poll returns the same payload.
 * @param {import('../types/updates.types.js').UpdateFeedItem} item
 */
function serializeFeedItem(item) {
  return [
    item.id,
    item.isoTimestamp,
    item.title,
    item.preview,
    item.channelLabel ?? '',
    item.actionUrl ?? '',
  ].join('\t');
}

/**
 * @param {ReturnType<typeof groupSlackUpdatesIntoFeed>} grouped
 */
export function groupedUpdatesSignature(grouped) {
  return JSON.stringify({
    t: grouped.today.map(serializeFeedItem),
    w: grouped.thisWeek.map(serializeFeedItem),
    e: grouped.earlier.map(serializeFeedItem),
  });
}

export function filterGroupedUpdates(grouped, query) {
  const q = query.trim().toLowerCase();
  if (!q) return grouped;

  const match = (item) => {
    const t = `${item.title} ${item.preview} ${item.channelLabel ?? ''}`.toLowerCase();
    return t.includes(q);
  };

  return {
    today: grouped.today.filter(match),
    thisWeek: grouped.thisWeek.filter(match),
    earlier: grouped.earlier.filter(match),
  };
}

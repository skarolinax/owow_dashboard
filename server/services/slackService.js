import { WebClient } from '@slack/web-api';

const HISTORY_PAGE_LIMIT = 75;

const MAX_MESSAGES_PER_CHANNEL = 200;

export function isUserVisibleMessage(message) {
  if (message.type !== 'message' || message.subtype != null) return false;
  if (typeof message.ts !== 'string') return false;
  const text = typeof message.text === 'string' ? message.text.trim() : '';
  if (!text) return false;
  return true;
}


export function parseCommaSeparatedChannelIds(raw) {
  return raw
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
}

export function parseSlackChannelIds() {
  const multi = process.env.SLACK_CHANNEL_IDS;
  if (typeof multi === 'string' && multi.trim()) {
    return dedupeChannelIds(parseCommaSeparatedChannelIds(multi));
  }

  const single = process.env.SLACK_CHANNEL_ID;
  if (typeof single === 'string' && single.trim()) {
    return dedupeChannelIds(parseCommaSeparatedChannelIds(single));
  }

  return [];
}

function dedupeChannelIds(ids) {
  const seen = new Set();
  const out = [];
  for (const id of ids) {
    if (seen.has(id)) continue;
    seen.add(id);
    out.push(id);
  }
  return out;
}

export async function resolveChannelDisplayNames(client, channelIds) {
  const entries = await Promise.all(
    channelIds.map(async (id) => {
      try {
        const r = await client.conversations.info({ channel: id });
        if (r.ok && r.channel && typeof r.channel.name === 'string') {
          return [id, r.channel.name];
        }
        if (!r.ok) {
          console.error(
            `[updates/slack] conversations.info not ok for channel="${id}": ${r.error ?? 'unknown'}`,
          );
        }
      } catch (e) {
        const slackErr =
        (e).data?.error ?? e.message;
        console.error(
          `[updates/slack] conversations.info failed for channel="${id}": ${slackErr}`,
        );
      }
      return [id, null];
    }),
  );
  return Object.fromEntries(entries);
}

const MAX_HISTORY_PAGES = 40;

export async function fetchChannelHistoryPaginated({ client, channelId }) {
  const collected = [];
  let cursor;
  let pages = 0;

  while (collected.length < MAX_MESSAGES_PER_CHANNEL && pages < MAX_HISTORY_PAGES) {
    pages += 1;
    const result = await client.conversations.history({
      channel: channelId,
      limit: HISTORY_PAGE_LIMIT,
      cursor,
    });

    if (!result.ok) {
      const err = new Error(result.error || 'conversations.history failed');
      throw err;
    }

    const raw = result.messages ?? [];
    const visible = raw.filter(isUserVisibleMessage);
    for (const m of visible) {
      collected.push({ ...m, channelId });
      if (collected.length >= MAX_MESSAGES_PER_CHANNEL) break;
    }

    const nextCursor = result.response_metadata?.next_cursor;
    if (!nextCursor) break;
    cursor = nextCursor;
  }

  return collected;
}

export async function fetchAllChannelsMessages({ client, channelIds }) {
  const perChannel = await Promise.all(
    channelIds.map(async (channelId) => {
      try {
        return await fetchChannelHistoryPaginated({ client, channelId });
      } catch (err) {
        const code =
          /** @type {{ slackError?: string }} */ (err).slackError ?? err.message;
        console.error(
          `[updates/slack] conversations.history failed for channel="${channelId}": ${code}`,
        );
        return [];
      }
    }),
  );
  const merged = perChannel.flat();
  merged.sort((a, b) => parseFloat(b.ts) - parseFloat(a.ts));
  return merged;
}

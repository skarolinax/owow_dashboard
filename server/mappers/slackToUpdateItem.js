const PREVIEW_MAX_CHARS = 500;
export function trimPreviewText(text) {
  const t = text.trim();
  if (t.length <= PREVIEW_MAX_CHARS) return t;
  return `${t.slice(0, PREVIEW_MAX_CHARS - 1).trim()}…`;
}

export function extractTitleFromSlackText(text) {
  const trimmed = text.trim();
  if (!trimmed) return 'Slack message';

  const firstLine = trimmed.split(/\n/)[0] ?? trimmed;
  const sentence = firstLine.match(/^[^.!?]+(?:[.!?]|$)/);
  if (sentence && sentence[0].length <= 120) {
    return sentence[0].trim();
  }
  if (firstLine.length <= 120) return firstLine.trim();
  return `${firstLine.slice(0, 117).trim()}…`;
}

export function slackTsToIso(ts) {
  const ms = Math.floor(parseFloat(ts) * 1000);
  return new Date(ms).toISOString();
}

/**
 * @param {object} params
 * @param {import('@slack/web-api').WebClient} params.client
 * @param {Array<import('@slack/web-api').MessageElement & { channelId: string }>} params.messages
 * @param {Record<string, string | null>} [params.channelNameById]
 * @returns {Promise<object[]>}
 */
export async function mapSlackMessagesToUpdateItems({
  client,
  messages,
  channelNameById = {},
}) {
  const withPermalinks = await Promise.all(
    messages.map(async (message) => {
      const channelId = message.channelId;
      const ts = message.ts;
      const rawText = typeof message.text === 'string' ? message.text : '';
      const title = extractTitleFromSlackText(rawText);
      const preview = trimPreviewText(rawText);
      let actionUrl = '#';

      try {
        const permalinkResult = await client.chat.getPermalink({
          channel: channelId,
          message_ts: ts,
        });
        if (permalinkResult.ok && permalinkResult.permalink) {
          actionUrl = permalinkResult.permalink;
        }
      } catch {
        const q = new URLSearchParams({ channel: channelId, message_ts: ts });
        actionUrl = `https://slack.com/app_redirect?${q.toString()}`;
      }

      const channelName = channelNameById[channelId];
      const channelLabel =
        channelName && channelName.length > 0 ? `From #${channelName}` : undefined;

      return {
        id: `${channelId}-${ts}`,
        title,
        preview,
        isoTimestamp: slackTsToIso(ts),
        source: 'Slack',
        sourceKind: 'slack',
        actionLabel: 'Open in Slack',
        actionUrl,
        slackChannelId: channelId,
        slackMessageTs: ts,
        channelLabel,
      };
    }),
  );

  return withPermalinks;
}

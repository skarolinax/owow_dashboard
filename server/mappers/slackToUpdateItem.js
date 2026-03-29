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

export async function mapSlackMessagesToUpdateItems({ client, channelId, messages }) {
  const withPermalinks = await Promise.all(
    messages.map(async (message) => {
      const ts = message.ts;
      const text = typeof message.text === 'string' ? message.text : '';
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

      return {
        id: ts,
        title: extractTitleFromSlackText(text),
        preview: text,
        isoTimestamp: slackTsToIso(ts),
        source: 'Slack',
        sourceKind: 'slack',
        actionLabel: 'Open in Slack',
        actionUrl,
        slackChannelId: channelId,
        slackMessageTs: ts,
      };
    }),
  );

  return withPermalinks;
}

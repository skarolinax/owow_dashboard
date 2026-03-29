import { WebClient } from '@slack/web-api';

export function isUserVisibleMessage(message) {
  if (message.type !== 'message' || message.subtype != null) return false;
  if (typeof message.ts !== 'string') return false;
  const text = typeof message.text === 'string' ? message.text.trim() : '';
  if (!text) return false;
  return true;
}

export async function fetchChannelUserMessages({ client, channelId, limit = 50 }) {
  const result = await client.conversations.history({
    channel: channelId,
    limit,
  });

  if (!result.ok) {
    const err = new Error(result.error || 'conversations.history failed');
    /** @type {any} */ (err).slackError = result.error;
    throw err;
  }

  const messages = result.messages ?? [];
  return messages.filter(isUserVisibleMessage);
}

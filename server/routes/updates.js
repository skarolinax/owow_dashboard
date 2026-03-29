import { Router } from 'express';
import { WebClient } from '@slack/web-api';
import {
  fetchAllChannelsMessages,
  parseSlackChannelIds,
  resolveChannelDisplayNames,
} from '../services/slackService.js';
import { mapSlackMessagesToUpdateItems } from '../mappers/slackToUpdateItem.js';

export const updatesRouter = Router();

updatesRouter.get('/slack', async (_req, res) => {
  const token = process.env.SLACK_BOT_TOKEN;
  const channelIds = parseSlackChannelIds();

  if (!token) {
    console.error('[updates/slack] Missing SLACK_BOT_TOKEN — returning empty list');
    return res.json({ items: [] });
  }

  if (channelIds.length === 0) {
    console.error(
      '[updates/slack] No channel IDs configured. Set SLACK_CHANNEL_IDS (comma-separated, preferred for multiple) or SLACK_CHANNEL_ID (one id or comma-separated).',
    );
    return res.json({ items: [] });
  }

  try {
    const client = new WebClient(token);
    const channelNameById = await resolveChannelDisplayNames(client, channelIds);
    const messages = await fetchAllChannelsMessages({ client, channelIds });

    if (messages.length === 0 && channelIds.length > 0) {
      console.warn(
        `[updates/slack] No messages loaded from ${channelIds.length} channel(s). Check IDs, bot membership, and scopes (e.g. channels:history).`,
      );
    }

    const items = await mapSlackMessagesToUpdateItems({
      client,
      messages,
      channelNameById,
    });
    return res.json({ items });
  } catch (err) {
    console.error('[updates/slack] Unexpected error while building updates:', err.message);
    return res.json({ items: [] });
  }
});

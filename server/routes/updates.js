import { Router } from 'express';
import { WebClient } from '@slack/web-api';
import { fetchChannelUserMessages } from '../services/slackService.js';
import { mapSlackMessagesToUpdateItems } from '../mappers/slackToUpdateItem.js';

export const updatesRouter = Router();

updatesRouter.get('/slack', async (_req, res) => {
  const token = process.env.SLACK_BOT_TOKEN;
  const channelId = process.env.SLACK_CHANNEL_ID;

  if (!token || !channelId) {
    console.error(
      '[updates/slack] Missing SLACK_BOT_TOKEN or SLACK_CHANNEL_ID — returning empty list',
    );
    return res.json({ items: [] });
  }

  try {
    const client = new WebClient(token);
    const messages = await fetchChannelUserMessages({ client, channelId });
    const items = await mapSlackMessagesToUpdateItems({
      client,
      channelId,
      messages,
    });
    return res.json({ items });
  } catch (err) {
    console.error('[updates/slack] Slack request failed:', err);
    return res.json({ items: [] });
  }
});

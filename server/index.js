import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { updatesRouter } from './routes/updates.js';

const app = express();
const PORT = Number(process.env.PORT) || 3001;

app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);
app.use(express.json());

app.use('/api/updates', updatesRouter);

const server = app.listen(PORT, () => {
  console.log(`[api] listening on http://localhost:${PORT}`);
});

server.on('error', (err) => {
  console.error('[api] failed to start:', err);
  process.exit(1);
});

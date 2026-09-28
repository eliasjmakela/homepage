# now-bot

Telegram bot that edits `src/content/now.json` (the "Juuri nyt" section on
the landing page) by committing directly to the `production` branch on
GitHub. Cloudflare Pages is already connected to that branch, so pushing a
commit triggers a normal build + deploy — the bot never talks to Cloudflare
at all.

## Commands

- `/list` — show current items
- `/add <text>` — append an item
- `/remove <n>` — remove item number `n`
- `/edit <n> <text>` — replace item number `n`
- `/help` — show this list

Only the chat/user ID in `TELEGRAM_OWNER_CHAT_ID` is allowed to use the bot;
everyone else is silently ignored.

## One-time setup

1. **Create the bot**: message [@BotFather](https://t.me/BotFather) on
   Telegram, `/newbot`, and copy the bot token.

2. **Find your chat ID**: message [@userinfobot](https://t.me/userinfobot)
   (or your new bot, then check `getUpdates`) and copy your numeric user ID.

3. **Create a GitHub token** scoped to just this repo:
   GitHub → Settings → Developer settings → Fine-grained tokens → Generate
   new token → Repository access: **Only select repositories** →
   `eliasjmakela/homepage` → Repository permissions → **Contents: Read and
   write**. Nothing else.

4. **Generate a webhook secret**: `openssl rand -hex 32`. This is separate
   from the bot token — Telegram sends it back on every webhook call so the
   Worker can reject requests that didn't come from Telegram.

5. **Install deps**:
   ```
   cd bot
   npm install
   ```

6. **Set secrets** (prompts for each value, nothing is written to disk):
   ```
   npx wrangler secret put GITHUB_TOKEN
   npx wrangler secret put TELEGRAM_BOT_TOKEN
   npx wrangler secret put TELEGRAM_WEBHOOK_SECRET
   npx wrangler secret put TELEGRAM_OWNER_CHAT_ID
   ```
   For local dev instead, copy `.dev.vars.example` to `.dev.vars` and fill
   it in — it's already gitignored.

7. **Deploy**:
   ```
   npm run deploy
   ```
   Note the `*.workers.dev` URL it prints.

8. **Register the webhook** with Telegram (replace both placeholders):
   ```
   curl "https://api.telegram.org/bot<TELEGRAM_BOT_TOKEN>/setWebhook" \
     -d "url=https://<worker-url>/telegram-webhook" \
     -d "secret_token=<TELEGRAM_WEBHOOK_SECRET>"
   ```

9. Message the bot `/list` to confirm it works.

## Notes

- Every mutating command sets `updatedAt` to today's date automatically.
- Commits land on `production` directly (no PR/review step) — that was a
  deliberate tradeoff for a single-owner tool. If you ever want a review
  step, point `GITHUB_BRANCH` at a new branch and open a PR from there
  instead.

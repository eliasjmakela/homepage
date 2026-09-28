// Mirrors wrangler.jsonc `vars` plus the secrets set via `wrangler secret put`.
// Run `npm run cf-typegen` after adding bindings to regenerate this properly.
interface Env {
  GITHUB_REPO: string;
  GITHUB_BRANCH: string;
  GITHUB_FILE_PATH: string;

  GITHUB_TOKEN: string;
  TELEGRAM_BOT_TOKEN: string;
  TELEGRAM_WEBHOOK_SECRET: string;
  TELEGRAM_OWNER_CHAT_ID: string;
}

import { commitNow, fetchNow, todayIso, type NowContent } from "./github";
import { sendMessage, timingSafeEqual, type TelegramUpdate } from "./telegram";

const HELP_TEXT = `Komennot:
/list - näytä nykyiset "Juuri nyt" -kohdat
/add <teksti> - lisää uusi kohta
/remove <n> - poista kohta numerolla n
/edit <n> <teksti> - korvaa kohta numerolla n
/help - näytä tämä ohje`;

function formatList(now: NowContent): string {
  if (now.items.length === 0) return "Lista on tyhjä.\n\n" + HELP_TEXT;
  const lines = now.items.map((item, i) => `${i + 1}. ${item}`);
  return `Nykyiset kohdat (päivitetty ${now.updatedAt}):\n${lines.join("\n")}`;
}

function parseIndex(raw: string, length: number): number | null {
  const n = Number.parseInt(raw, 10);
  if (!Number.isInteger(n) || n < 1 || n > length) return null;
  return n - 1;
}

async function handleCommand(
  env: Env,
  text: string,
): Promise<string> {
  const [command, ...rest] = text.trim().split(/\s+/);
  const arg = rest.join(" ");

  if (command === "/start" || command === "/help") {
    return HELP_TEXT;
  }

  if (command === "/list") {
    const { content } = await fetchNow(env);
    return formatList(content);
  }

  if (command === "/add") {
    if (!arg) return "Anna lisättävä teksti: /add <teksti>";
    const { sha, content } = await fetchNow(env);
    const updated: NowContent = {
      items: [...content.items, arg],
      updatedAt: todayIso(),
    };
    await commitNow(env, sha, updated, `now: lisää kohta`);
    return `Lisätty.\n\n${formatList(updated)}`;
  }

  if (command === "/remove") {
    const { sha, content } = await fetchNow(env);
    const index = parseIndex(rest[0] ?? "", content.items.length);
    if (index === null) {
      return `Anna kelvollinen numero (1-${content.items.length}): /remove <n>`;
    }
    const removed = content.items[index];
    const updated: NowContent = {
      items: content.items.filter((_, i) => i !== index),
      updatedAt: todayIso(),
    };
    await commitNow(env, sha, updated, `now: poista kohta`);
    return `Poistettu: "${removed}"\n\n${formatList(updated)}`;
  }

  if (command === "/edit") {
    const { sha, content } = await fetchNow(env);
    const [indexRaw, ...textParts] = rest;
    const index = parseIndex(indexRaw ?? "", content.items.length);
    const newText = textParts.join(" ");
    if (index === null || !newText) {
      return `Käyttö: /edit <n> <uusi teksti> (n: 1-${content.items.length})`;
    }
    const items = [...content.items];
    items[index] = newText;
    const updated: NowContent = { items, updatedAt: todayIso() };
    await commitNow(env, sha, updated, `now: muokkaa kohtaa`);
    return `Muokattu.\n\n${formatList(updated)}`;
  }

  return `Tuntematon komento.\n\n${HELP_TEXT}`;
}

async function handleUpdate(env: Env, update: TelegramUpdate): Promise<void> {
  const message = update.message;
  const text = message?.text;
  if (!message || !text) return;

  const senderId = String(message.from?.id ?? message.chat.id);
  if (!timingSafeEqual(senderId, env.TELEGRAM_OWNER_CHAT_ID)) return;

  let reply: string;
  try {
    reply = await handleCommand(env, text);
  } catch (err) {
    reply = `Virhe: ${err instanceof Error ? err.message : String(err)}`;
  }
  await sendMessage(env, message.chat.id, reply);
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname !== "/telegram-webhook" || request.method !== "POST") {
      return new Response("not found", { status: 404 });
    }

    const secret = request.headers.get("x-telegram-bot-api-secret-token") ?? "";
    if (!timingSafeEqual(secret, env.TELEGRAM_WEBHOOK_SECRET)) {
      return new Response("unauthorized", { status: 401 });
    }

    let update: TelegramUpdate;
    try {
      update = await request.json();
    } catch {
      return new Response("bad request", { status: 400 });
    }

    ctx.waitUntil(
      handleUpdate(env, update).catch((err) => {
        console.error("handleUpdate failed", err);
      }),
    );

    return new Response("ok");
  },
} satisfies ExportedHandler<Env>;

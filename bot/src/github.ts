export interface NowContent {
  items: string[];
  updatedAt: string;
}

interface GithubFile {
  sha: string;
  content: NowContent;
}

function base64ToUtf8(base64: string): string {
  const binary = atob(base64.replace(/\n/g, ""));
  const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

function utf8ToBase64(text: string): string {
  const bytes = new TextEncoder().encode(text);
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary);
}

function apiUrl(env: Env): string {
  return `https://api.github.com/repos/${env.GITHUB_REPO}/contents/${env.GITHUB_FILE_PATH}`;
}

function githubHeaders(env: Env, extra?: Record<string, string>): HeadersInit {
  return {
    Authorization: `Bearer ${env.GITHUB_TOKEN}`,
    Accept: "application/vnd.github+json",
    "User-Agent": "now-bot",
    "X-GitHub-Api-Version": "2022-11-28",
    ...extra,
  };
}

export async function fetchNow(env: Env): Promise<GithubFile> {
  const res = await fetch(
    `${apiUrl(env)}?ref=${encodeURIComponent(env.GITHUB_BRANCH)}`,
    { headers: githubHeaders(env) },
  );
  if (!res.ok) {
    throw new Error(`GitHub GET failed: ${res.status} ${await res.text()}`);
  }
  const body = (await res.json()) as { sha: string; content: string };
  const content = JSON.parse(base64ToUtf8(body.content)) as NowContent;
  return { sha: body.sha, content };
}

export async function commitNow(
  env: Env,
  sha: string,
  content: NowContent,
  message: string,
): Promise<string> {
  const res = await fetch(apiUrl(env), {
    method: "PUT",
    headers: githubHeaders(env, { "Content-Type": "application/json" }),
    body: JSON.stringify({
      message,
      content: utf8ToBase64(JSON.stringify(content, null, 2) + "\n"),
      sha,
      branch: env.GITHUB_BRANCH,
    }),
  });
  if (!res.ok) {
    throw new Error(`GitHub PUT failed: ${res.status} ${await res.text()}`);
  }
  const body = (await res.json()) as { commit: { html_url: string } };
  return body.commit.html_url;
}

export function todayIso(): string {
  return new Date().toISOString().slice(0, 10);
}

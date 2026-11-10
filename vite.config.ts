import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mdx from '@mdx-js/rollup'
import remarkFrontmatter from 'remark-frontmatter'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'
import { readFile } from 'node:fs/promises'
import { parse as parseYaml } from 'yaml'
import type { Plugin } from 'vite'

import { cloudflare } from "@cloudflare/vite-plugin";

const FRONTMATTER = /\.mdx\?frontmatter$/
const PREFIX = '\0mdx-frontmatter:'

/** Minutes to read an MDX body at 200 words a minute, ignoring imports,
 *  exports and JSX tags; never less than one */
function readingMinutes(body: string): number {
  const words = body
    .replace(/^(import|export)\s.*$/gm, '')
    .replace(/<[^>]*>/g, ' ')
    .split(/\s+/)
    .filter((word) => /[\p{L}\p{N}]/u.test(word)).length
  return Math.max(1, Math.round(words / 200))
}

/** `post.mdx?frontmatter` is just the post's YAML block, as a default export,
 *  plus its reading time.
 *  Listing pages import that instead of the whole module, so each write-up
 *  gets its own chunk and loads only when its page opens. */
function mdxFrontmatter(): Plugin {
  return {
    name: 'mdx-frontmatter',
    enforce: 'pre',
    async resolveId(source, importer) {
      if (!FRONTMATTER.test(source)) return null
      const resolved = await this.resolve(source.replace(/\?frontmatter$/, ''), importer)
      return resolved && PREFIX + resolved.id
    },
    async load(id) {
      if (!id.startsWith(PREFIX)) return null
      const file = id.slice(PREFIX.length)
      this.addWatchFile(file)
      const source = await readFile(file, 'utf8')
      const yaml = source.match(/^---\r?\n([\s\S]*?)\r?\n---/)
      const data = { ...(yaml ? parseYaml(yaml[1]) : {}), readingMinutes: readingMinutes(source.slice(yaml?.[0].length ?? 0)) }
      return `export default ${JSON.stringify(data)}`
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    mdxFrontmatter(),
    { enforce: 'pre', ...mdx({ remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter] }) },
    react({ include: /\.(jsx|js|mdx|md|tsx|ts)$/ }),
    cloudflare(),
  ],
})

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

/** `post.mdx?frontmatter` is just the post's YAML block, as a default export.
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
      const yaml = (await readFile(file, 'utf8')).match(/^---\r?\n([\s\S]*?)\r?\n---/)
      return `export default ${JSON.stringify(yaml ? parseYaml(yaml[1]) : {})}`
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

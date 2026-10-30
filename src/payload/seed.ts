// Fills an empty database with the starting content:
//   npm run seed
// Safe to run again: documents are matched by slug and updated.

import fs from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"

import {
  convertMarkdownToLexical,
  editorConfigFactory,
} from "@payloadcms/richtext-lexical"
import { getPayload } from "payload"

import config from "../payload.config"
import type { Post, Project } from "../payload-types"
import { seedProjects } from "./seed-data"

const locales = ["ru", "en", "ky"] as const

const dirname = path.dirname(fileURLToPath(import.meta.url))
const blogDir = path.resolve(dirname, "../../content/blog")

const payload = await getPayload({ config })
const editorConfig = await editorConfigFactory.default({
  config: payload.config,
})

const toRichText = (markdown: string) =>
  convertMarkdownToLexical({ editorConfig, markdown }) as Project["description"]

const findId = async (collection: "projects" | "posts", slug: string) => {
  const { docs } = await payload.find({
    collection,
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 0,
    draft: true,
  })
  return docs[0]?.id
}

// Front matter of the old Astro posts: flat `key: value` lines
const parseMarkdown = (source: string) => {
  const match = source
    .replace(/\r\n/g, "\n")
    .match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/)
  if (!match) throw new Error("No front matter")

  const meta: Record<string, string> = {}
  for (const line of match[1].split("\n")) {
    const colon = line.indexOf(":")
    if (colon === -1) continue
    meta[line.slice(0, colon).trim()] = line
      .slice(colon + 1)
      .trim()
      .replace(/^"(.*)"$/, "$1")
  }
  return { meta, body: match[2].trim() }
}

// --- Projects ---------------------------------------------------------------

for (const project of seedProjects) {
  let id = await findId("projects", project.slug)
  // Rows of the links array are shared; only their labels differ per
  // language, so later languages must point at the same row ids.
  let linkIds: (string | null | undefined)[] = []

  for (const locale of locales) {
    const text = project.content[locale]
    const data = {
      title: project.title,
      slug: project.slug,
      order: project.order,
      stack: project.stack,
      kind: text.kind,
      summary: text.summary,
      role: text.role || null,
      period: text.period || null,
      description: toRichText(text.description),
      links: project.links.map((link, index) => ({
        id: linkIds[index],
        kind: link.kind,
        url: link.url,
        label: link.label,
      })),
      _status: "published" as const,
    }

    const doc: Project = id
      ? await payload.update({ collection: "projects", id, locale, data })
      : await payload.create({ collection: "projects", locale, data })

    id = doc.id
    linkIds = (doc.links ?? []).map((link) => link.id)
  }

  payload.logger.info(`project: ${project.slug}`)
}

// --- Blog posts from content/blog/<locale>/<slug>.md ------------------------

const files = (await fs.readdir(path.join(blogDir, "ru"))).filter((file) =>
  file.endsWith(".md")
)

for (const file of files) {
  const slug = file.replace(/\.md$/, "")
  let id = await findId("posts", slug)

  for (const locale of locales) {
    let source: string
    try {
      source = await fs.readFile(path.join(blogDir, locale, file), "utf8")
    } catch {
      continue // no translation for this language
    }

    const { meta, body } = parseMarkdown(source)
    const data = {
      title: meta.title,
      description: meta.description || null,
      slug,
      publishedAt: new Date(meta.pubDate).toISOString(),
      content: toRichText(body) as Post["content"],
      _status: "published" as const,
    }

    const doc: Post = id
      ? await payload.update({ collection: "posts", id, locale, data })
      : await payload.create({ collection: "posts", locale, data })

    id = doc.id
  }

  payload.logger.info(`post: ${slug}`)
}

payload.logger.info("Seed done")
process.exit(0)

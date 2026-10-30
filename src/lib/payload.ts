// Reading content from Payload in server components (Local API: no HTTP,
// straight to the database).

import config from "@payload-config"
import { getPayload, type Where } from "payload"
import { cache } from "react"

import type { Locale } from "@/i18n/routing"

// One instance per request; Payload also keeps it between requests
export const getCms = cache(() => getPayload({ config }))

// The Local API skips access rules, so visitors' "published only" is
// spelled out here.
const published: Where = { _status: { equals: "published" } }

const withSlug = (slug: string): Where => ({
  and: [published, { slug: { equals: slug } }],
})

export const getProjects = cache(async (locale: Locale) => {
  const payload = await getCms()
  const { docs } = await payload.find({
    collection: "projects",
    locale,
    where: published,
    sort: "order",
    depth: 1,
    pagination: false,
  })
  return docs
})

export const getProject = cache(async (slug: string, locale: Locale) => {
  const payload = await getCms()
  const { docs } = await payload.find({
    collection: "projects",
    locale,
    where: withSlug(slug),
    depth: 1,
    limit: 1,
  })
  return docs[0] ?? null
})

export const getPosts = cache(async (locale: Locale) => {
  const payload = await getCms()
  const { docs } = await payload.find({
    collection: "posts",
    locale,
    where: published,
    sort: "-publishedAt",
    depth: 1,
    pagination: false,
  })
  return docs
})

export const getPost = cache(async (slug: string, locale: Locale) => {
  const payload = await getCms()
  const { docs } = await payload.find({
    collection: "posts",
    locale,
    where: withSlug(slug),
    depth: 1,
    limit: 1,
  })
  return docs[0] ?? null
})

// Slugs for generateStaticParams and the sitemap
export const getSlugs = cache(async (collection: "projects" | "posts") => {
  const payload = await getCms()
  const { docs } = await payload.find({
    collection,
    where: published,
    select: { slug: true, updatedAt: true },
    depth: 0,
    pagination: false,
  })
  return docs.map(({ slug, updatedAt }) => ({ slug, updatedAt }))
})

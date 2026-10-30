import { convertLexicalToPlaintext } from "@payloadcms/richtext-lexical/plaintext"

import { localeTags, type Locale } from "@/i18n/routing"
import type { Post } from "@/payload-types"

// "2026-05-03" → "3 мая 2026" / "May 3, 2026" / "3-май, 2026"
export function formatDate(value: string, locale: Locale) {
  return new Intl.DateTimeFormat(localeTags[locale], {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  })
    .format(new Date(value))
    .replace(/\s?г\.$/, "")
}

// Minutes to read at about 200 words a minute
export function readingTime(post: Pick<Post, "content">) {
  if (!post.content) return 1
  const text = convertLexicalToPlaintext({ data: post.content })
  const words = text.split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(words / 200))
}

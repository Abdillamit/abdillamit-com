import type { Field, FieldHook } from "payload"

// Labels for the admin panel, which speaks Russian and English
export const label = (ru: string, en: string) => ({ ru, en })

export const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s.-]/g, "")
    .replace(/[\s.]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")

// Fills the slug from the title when it is left empty
const fillSlug =
  (from: string): FieldHook =>
  ({ value, data, originalDoc }) => {
    if (typeof value === "string" && value.trim()) return slugify(value)
    // Not sent at all (a partial update via the API): keep the current one
    if (value === undefined && typeof originalDoc?.slug === "string") {
      return originalDoc.slug
    }
    const source = data?.[from]
    return typeof source === "string" ? slugify(source) : value
  }

// One slug for all languages: /ru/projects/finik and /en/projects/finik
export const slugField = (from = "title"): Field => ({
  name: "slug",
  type: "text",
  label: label("Адрес (slug)", "Slug"),
  required: true,
  unique: true,
  index: true,
  admin: {
    position: "sidebar",
    description: label(
      "Латиницей, без пробелов. Пусто — возьмётся из названия.",
      "Latin letters, no spaces. Empty — taken from the title."
    ),
  },
  hooks: { beforeValidate: [fillSlug(from)] },
})

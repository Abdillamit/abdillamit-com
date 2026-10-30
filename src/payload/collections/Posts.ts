import type { CollectionConfig } from "payload"

import { isStaff, publishedOrStaff } from "../access"
import { label, slugField } from "../fields"

// Blog posts. One document holds all three languages of a post.
export const Posts: CollectionConfig = {
  slug: "posts",
  labels: {
    singular: label("Пост", "Post"),
    plural: label("Блог", "Blog"),
  },
  defaultSort: "-publishedAt",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "publishedAt", "_status"],
    group: label("Контент", "Content"),
  },
  versions: {
    drafts: true,
    maxPerDoc: 20,
  },
  access: {
    read: publishedOrStaff,
    create: isStaff,
    update: isStaff,
    delete: isStaff,
  },
  fields: [
    {
      name: "title",
      type: "text",
      label: label("Заголовок", "Title"),
      localized: true,
      required: true,
    },
    {
      name: "description",
      type: "textarea",
      label: label("Описание", "Description"),
      localized: true,
      maxLength: 300,
    },
    {
      name: "content",
      type: "richText",
      label: label("Текст", "Content"),
      localized: true,
    },
    {
      name: "cover",
      type: "upload",
      relationTo: "media",
      label: label("Обложка", "Cover"),
    },
    slugField(),
    {
      name: "publishedAt",
      type: "date",
      label: label("Дата публикации", "Published"),
      required: true,
      defaultValue: () => new Date().toISOString(),
      admin: {
        position: "sidebar",
        date: { pickerAppearance: "dayOnly" },
      },
    },
  ],
}

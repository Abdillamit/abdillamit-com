import type { CollectionConfig } from "payload"

import { isStaff, publishedOrStaff } from "../access"
import { label, slugField } from "../fields"

// Projects for /projects and /projects/[slug]. Text fields have a value
// per language (ru, en, ky); the slug, stack, links and order are shared.
export const Projects: CollectionConfig = {
  slug: "projects",
  labels: {
    singular: label("Проект", "Project"),
    plural: label("Проекты", "Projects"),
  },
  defaultSort: "order",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "kind", "order", "_status", "updatedAt"],
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
      type: "tabs",
      tabs: [
        {
          label: label("Описание", "Content"),
          fields: [
            {
              name: "title",
              type: "text",
              label: label("Название", "Title"),
              localized: true,
              required: true,
            },
            {
              name: "kind",
              type: "text",
              label: label("Сфера", "Field"),
              localized: true,
              admin: {
                description: label(
                  "Коротко: «Финтех», «Логистика».",
                  "Short: “Fintech”, “Logistics”."
                ),
              },
            },
            {
              name: "summary",
              type: "textarea",
              label: label("Коротко о проекте", "Summary"),
              localized: true,
              required: true,
              maxLength: 280,
              admin: {
                description: label(
                  "Для карточки и описания страницы в поиске.",
                  "For the card and the search description."
                ),
              },
            },
            {
              name: "description",
              type: "richText",
              label: label("Подробно", "Description"),
              localized: true,
            },
            {
              type: "row",
              fields: [
                {
                  name: "role",
                  type: "text",
                  label: label("Моя роль", "My role"),
                  localized: true,
                },
                {
                  name: "period",
                  type: "text",
                  label: label("Период", "Period"),
                  localized: true,
                },
              ],
            },
          ],
        },
        {
          label: label("Медиа", "Media"),
          fields: [
            {
              name: "cover",
              type: "upload",
              relationTo: "media",
              label: label("Обложка", "Cover"),
            },
            {
              name: "gallery",
              type: "array",
              label: label("Скриншоты", "Screenshots"),
              labels: {
                singular: label("Скриншот", "Screenshot"),
                plural: label("Скриншоты", "Screenshots"),
              },
              fields: [
                {
                  name: "image",
                  type: "upload",
                  relationTo: "media",
                  required: true,
                },
                {
                  name: "caption",
                  type: "text",
                  label: label("Подпись", "Caption"),
                  localized: true,
                },
              ],
            },
          ],
        },
        {
          label: label("Стек и ссылки", "Stack and links"),
          fields: [
            {
              name: "stack",
              type: "text",
              hasMany: true,
              label: label("Стек", "Stack"),
              admin: {
                description: label(
                  "По одной технологии: React, TypeScript…",
                  "One technology each: React, TypeScript…"
                ),
              },
            },
            {
              name: "links",
              type: "array",
              label: label("Ссылки", "Links"),
              labels: {
                singular: label("Ссылка", "Link"),
                plural: label("Ссылки", "Links"),
              },
              fields: [
                {
                  type: "row",
                  fields: [
                    {
                      name: "kind",
                      type: "select",
                      label: label("Тип", "Type"),
                      defaultValue: "live",
                      required: true,
                      options: [
                        { label: label("Сайт", "Website"), value: "live" },
                        { label: label("Код", "Code"), value: "repo" },
                        { label: label("Документация", "Docs"), value: "docs" },
                        { label: label("Другое", "Other"), value: "other" },
                      ],
                    },
                    {
                      name: "label",
                      type: "text",
                      label: label("Текст", "Label"),
                      localized: true,
                      required: true,
                    },
                    {
                      name: "url",
                      type: "text",
                      label: "URL",
                      required: true,
                      validate: (value: unknown) =>
                        typeof value === "string" && /^https?:\/\//.test(value)
                          ? true
                          : "https://…",
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    slugField(),
    {
      name: "order",
      type: "number",
      label: label("Порядок", "Order"),
      defaultValue: 0,
      admin: {
        position: "sidebar",
        description: label("Меньше — выше в списке.", "Lower comes first."),
      },
    },
  ],
}

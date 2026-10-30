import type { CollectionConfig } from "payload"

import { isStaff, publishedOrStaff } from "../access"
import { revalidateAfterChange, revalidateAfterDelete } from "../hooks/revalidate"
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
  hooks: {
    afterChange: [revalidateAfterChange],
    afterDelete: [revalidateAfterDelete],
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
              name: "tagline",
              type: "text",
              label: label("Подзаголовок", "Tagline"),
              localized: true,
              admin: {
                description: label(
                  "Одна строка под названием на странице проекта.",
                  "One line under the title on the project page."
                ),
              },
            },
            {
              name: "intro",
              type: "textarea",
              label: label("Что это", "What it is"),
              localized: true,
            },
            {
              name: "highlights",
              type: "array",
              label: label("Что я сделал", "What I did"),
              labels: {
                singular: label("Пункт", "Item"),
                plural: label("Пункты", "Items"),
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
                  name: "text",
                  type: "textarea",
                  label: label("Текст", "Text"),
                  localized: true,
                  required: true,
                },
              ],
            },
            {
              name: "layers",
              type: "array",
              label: label("Как устроено", "How it is built"),
              labels: {
                singular: label("Слой", "Layer"),
                plural: label("Слои", "Layers"),
              },
              admin: {
                description: label(
                  "Части продукта сверху вниз: интерфейс, API, данные…",
                  "Parts of the product from top to bottom: UI, API, data…"
                ),
              },
              fields: [
                {
                  type: "row",
                  fields: [
                    {
                      name: "tag",
                      type: "text",
                      label: label("Метка", "Tag"),
                      required: true,
                      admin: { width: "20%" },
                    },
                    {
                      name: "title",
                      type: "text",
                      label: label("Название", "Title"),
                      localized: true,
                      required: true,
                    },
                    {
                      name: "sub",
                      type: "text",
                      label: label("Детали", "Details"),
                      localized: true,
                    },
                  ],
                },
              ],
            },
            {
              name: "description",
              type: "richText",
              label: label("Подробно (необязательно)", "Long story (optional)"),
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
              name: "tone",
              type: "select",
              label: label("Цвет обложки без картинки", "Cover colour without an image"),
              defaultValue: "amber",
              options: [
                { label: label("Янтарный", "Amber"), value: "amber" },
                { label: label("Голубой", "Blue"), value: "blue" },
                { label: label("Песочный", "Sand"), value: "sand" },
                { label: label("Зелёный", "Green"), value: "green" },
              ],
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
      name: "company",
      type: "text",
      label: label("Компания", "Company"),
      defaultValue: "Mancho Devs",
      admin: { position: "sidebar" },
    },
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

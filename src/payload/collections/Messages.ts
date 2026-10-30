import type { CollectionConfig } from "payload"

import { isAdmin, nobody } from "../access"
import { label } from "../fields"

// Messages from the contact form. They are created only by the server
// action of the form (stage 5), never through the public API.
export const Messages: CollectionConfig = {
  slug: "messages",
  labels: {
    singular: label("Сообщение", "Message"),
    plural: label("Сообщения", "Messages"),
  },
  defaultSort: "-createdAt",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "email", "status", "createdAt"],
    group: label("Входящие", "Inbox"),
    description: label(
      "Заявки с формы на странице «Контакты».",
      "Requests from the contact form."
    ),
  },
  access: {
    create: nobody,
    read: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    {
      name: "name",
      type: "text",
      label: label("Имя", "Name"),
      required: true,
      maxLength: 100,
    },
    {
      name: "email",
      type: "email",
      label: label("Почта", "Email"),
      required: true,
    },
    {
      name: "message",
      type: "textarea",
      label: label("Сообщение", "Message"),
      required: true,
      maxLength: 4000,
    },
    {
      name: "status",
      type: "select",
      label: label("Статус", "Status"),
      defaultValue: "new",
      required: true,
      options: [
        { label: label("Новое", "New"), value: "new" },
        { label: label("Прочитано", "Read"), value: "read" },
        { label: label("В архиве", "Archived"), value: "archived" },
      ],
      admin: { position: "sidebar" },
    },
    {
      name: "locale",
      type: "select",
      label: label("Язык страницы", "Page language"),
      options: ["ru", "en", "ky"],
      admin: { position: "sidebar", readOnly: true },
    },
    {
      // Salted hash of the sender's IP, for the rate limit. The IP itself
      // is never stored.
      name: "ipHash",
      type: "text",
      index: true,
      admin: { hidden: true },
    },
  ],
}

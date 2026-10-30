import type { CollectionConfig } from "payload"

import { isAdmin, isAdminField, isAdminOrSelf } from "../access"
import { label } from "../fields"

export const Users: CollectionConfig = {
  slug: "users",
  labels: {
    singular: label("Пользователь", "User"),
    plural: label("Пользователи", "Users"),
  },
  auth: true,
  admin: {
    useAsTitle: "email",
    defaultColumns: ["name", "email", "role"],
    group: label("Настройки", "Settings"),
  },
  access: {
    // Anyone logged in may open the admin panel
    admin: ({ req }) => Boolean(req.user),
    read: isAdminOrSelf,
    create: isAdmin,
    update: isAdminOrSelf,
    delete: isAdmin,
  },
  hooks: {
    // The very first user (created on /admin) becomes the admin
    beforeChange: [
      async ({ data, operation, req }) => {
        if (operation !== "create") return data
        const { totalDocs } = await req.payload.count({
          collection: "users",
          req,
        })
        return totalDocs === 0 ? { ...data, role: "admin" } : data
      },
    ],
  },
  fields: [
    {
      name: "name",
      type: "text",
      label: label("Имя", "Name"),
    },
    {
      name: "role",
      type: "select",
      label: label("Роль", "Role"),
      required: true,
      defaultValue: "editor",
      saveToJWT: true,
      options: [
        { label: label("Администратор", "Admin"), value: "admin" },
        { label: label("Редактор", "Editor"), value: "editor" },
      ],
      access: {
        create: isAdminField,
        update: isAdminField,
      },
      admin: {
        position: "sidebar",
        description: label(
          "Редактор меняет проекты, посты и медиа. Пользователи и сообщения — только у администратора.",
          "Editors change projects, posts and media. Users and messages are for admins only."
        ),
      },
    },
  ],
}

import type { CollectionConfig } from "payload"

import { anyone, isStaff } from "../access"
import { revalidateAfterChange, revalidateAfterDelete } from "../hooks/revalidate"
import { label } from "../fields"

// Images for projects and posts. With S3 configured the files go to the
// bucket (see payload.config.ts); without it, to ./media for local work.
export const Media: CollectionConfig = {
  slug: "media",
  labels: {
    singular: label("Файл", "Media"),
    plural: label("Медиа", "Media"),
  },
  admin: {
    group: label("Контент", "Content"),
  },
  access: {
    read: anyone,
    create: isStaff,
    update: isStaff,
    delete: isStaff,
  },
  hooks: {
    afterChange: [revalidateAfterChange],
    afterDelete: [revalidateAfterDelete],
  },
  upload: {
    mimeTypes: ["image/*"],
    focalPoint: true,
    adminThumbnail: "thumbnail",
    imageSizes: [
      { name: "thumbnail", width: 480 },
      { name: "card", width: 1080 },
      { name: "wide", width: 1920 },
      { name: "og", width: 1200, height: 630, position: "centre" },
    ],
  },
  fields: [
    {
      name: "alt",
      type: "text",
      label: label("Описание для незрячих (alt)", "Alt text"),
      localized: true,
      required: true,
    },
  ],
}

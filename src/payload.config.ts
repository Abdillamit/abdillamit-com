import path from "node:path"
import { fileURLToPath } from "node:url"

import { postgresAdapter } from "@payloadcms/db-postgres"
import { lexicalEditor } from "@payloadcms/richtext-lexical"
import { s3Storage } from "@payloadcms/storage-s3"
import { en } from "@payloadcms/translations/languages/en"
import { ru } from "@payloadcms/translations/languages/ru"
import { buildConfig } from "payload"
import sharp from "sharp"

import { Media } from "./payload/collections/Media"
import { Messages } from "./payload/collections/Messages"
import { Posts } from "./payload/collections/Posts"
import { Projects } from "./payload/collections/Projects"
import { Users } from "./payload/collections/Users"

const dirname = path.dirname(fileURLToPath(import.meta.url))

// Public address of the bucket, e.g. https://media.abdillamit.dev.
// When set, images are served straight from it instead of through /api.
const publicMediaUrl = process.env.S3_PUBLIC_URL?.replace(/\/$/, "")

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SITE_URL,
  secret: process.env.PAYLOAD_SECRET || "",

  admin: {
    user: Users.slug,
    importMap: { baseDir: dirname },
    meta: {
      titleSuffix: " — abdillamit.dev",
      icons: [{ rel: "icon", type: "image/svg+xml", url: "/favicon.svg" }],
    },
  },

  collections: [Projects, Posts, Media, Messages, Users],

  // Content languages: every localized field has a value per locale.
  // Empty values fall back to Russian.
  localization: {
    locales: [
      { code: "ru", label: "Русский" },
      { code: "en", label: "English" },
      { code: "ky", label: "Кыргызча" },
    ],
    defaultLocale: "ru",
    fallback: true,
  },

  // Language of the admin panel itself (Payload has no Kyrgyz yet)
  i18n: {
    supportedLanguages: { ru, en },
    fallbackLanguage: "ru",
  },

  editor: lexicalEditor(),

  db: postgresAdapter({
    pool: { connectionString: process.env.DATABASE_URI || "" },
    migrationDir: path.resolve(dirname, "migrations"),
  }),

  plugins: [
    s3Storage({
      enabled: Boolean(process.env.S3_BUCKET),
      // Same database schema with and without S3
      alwaysInsertFields: true,
      // The browser uploads straight to the bucket, past Vercel's 4.5 MB
      // request limit. The bucket needs CORS for PUT from the site.
      clientUploads: true,
      collections: {
        media: publicMediaUrl
          ? {
              prefix: "media",
              disablePayloadAccessControl: true,
              generateFileURL: ({ filename, prefix }) =>
                `${publicMediaUrl}/${prefix ? `${prefix}/` : ""}${filename}`,
            }
          : { prefix: "media" },
      },
      bucket: process.env.S3_BUCKET || "",
      config: {
        region: process.env.S3_REGION || "auto",
        endpoint: process.env.S3_ENDPOINT || undefined,
        forcePathStyle: Boolean(process.env.S3_ENDPOINT),
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID || "",
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || "",
        },
      },
    }),
  ],

  sharp,

  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
})

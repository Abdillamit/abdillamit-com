import { withPayload } from "@payloadcms/next/withPayload"
import type { NextConfig } from "next"
import createNextIntlPlugin from "next-intl/plugin"

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts")

// Images from the bucket's public address may go through next/image
const mediaHost = (() => {
  try {
    return process.env.S3_PUBLIC_URL
      ? new URL(process.env.S3_PUBLIC_URL)
      : undefined
  } catch {
    return undefined
  }
})()

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: mediaHost
      ? [
          {
            protocol: mediaHost.protocol.replace(":", "") as "http" | "https",
            hostname: mediaHost.hostname,
          },
        ]
      : [],
  },
}

export default withPayload(withNextIntl(nextConfig), {
  devBundleServerPackages: false,
})

"use server"

import { createHash } from "node:crypto"

import { headers } from "next/headers"
import { hasLocale } from "next-intl"

import { routing } from "@/i18n/routing"
import { getCms } from "@/lib/payload"

import { checkFields } from "./fields"

export type ContactState = {
  status: "idle" | "invalid" | "limited" | "failed" | "sent"
  name?: string
  errors?: ReturnType<typeof checkFields>
}

// No more than LIMIT messages from one address in WINDOW minutes
const LIMIT = 3
const WINDOW_MINUTES = 10

// Saves a message from the contact form to the Messages collection. The
// visitor's IP is kept only as a salted hash, for the rate limit.
export async function sendMessage(_previous: ContactState, form: FormData): Promise<ContactState> {
  const read = (key: string) => String(form.get(key) ?? "").trim()
  const name = read("name")
  const email = read("email")
  const message = read("message")
  const locale = read("locale")

  // A hidden field: people never see it, bots fill it in. Pretend it worked.
  if (read("website")) return { status: "sent", name }

  const errors = checkFields(name, email, message)
  if (errors.name || errors.email || errors.message) return { status: "invalid", errors }

  const list = await headers()
  const ip =
    list.get("x-forwarded-for")?.split(",")[0]?.trim() || list.get("x-real-ip") || "unknown"
  const ipHash = createHash("sha256")
    .update(`${process.env.IP_HASH_SALT ?? ""}:${ip}`)
    .digest("hex")

  try {
    const payload = await getCms()
    const since = new Date(Date.now() - WINDOW_MINUTES * 60_000).toISOString()
    const { totalDocs } = await payload.count({
      collection: "messages",
      where: {
        and: [{ ipHash: { equals: ipHash } }, { createdAt: { greater_than: since } }],
      },
    })
    if (totalDocs >= LIMIT) return { status: "limited" }

    await payload.create({
      collection: "messages",
      data: {
        name,
        email,
        message,
        status: "new",
        locale: hasLocale(routing.locales, locale) ? locale : routing.defaultLocale,
        ipHash,
      },
    })
    return { status: "sent", name }
  } catch (error) {
    console.error("Contact form:", error)
    return { status: "failed" }
  }
}

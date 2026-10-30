// Commands of the site terminal. Pure functions: a command line goes in,
// lines to print (and maybe an action for the UI) come out. Texts come
// from messages (the Terminal namespace), so every language has them.

import type { Locale } from "@/i18n/routing"
import { contact, sourceUrl } from "@/lib/site"

export type Part = { text: string; href?: string }
export type Line =
  | { kind: "text" | "muted" | "error" | "art"; parts: Part[] }
  | { kind: "input"; prompt: string; text: string }

export type Action =
  | { type: "navigate"; to: string }
  | { type: "locale"; locale: Locale }
  | { type: "download"; href: string }
  | { type: "open"; href: string }
  | { type: "clear" }
  | { type: "close" }

export type Result = { output: Line[]; action?: Action }

// next-intl's translator for the Terminal namespace, loosely typed
export type Translate = {
  (key: string, values?: Record<string, string>): string
  raw(key: string): unknown
}

export type CommandContext = {
  t: Translate
  locale: Locale
  // First part of the path: "projects", "about"… ("" on the home page)
  section: string
  lede: string
  journey: { mark: string; title: string }[]
  resumePdf: string
}

const say = (text: string, kind: "text" | "muted" | "error" | "art" = "text"): Line => ({
  kind,
  parts: [{ text }],
})

const link = (label: string, href: string, before = ""): Line => ({
  kind: "text",
  parts: [{ text: before }, { text: label, href }],
})

const pages: Record<string, string> = {
  "": "/",
  "~": "/",
  "/": "/",
  "..": "/",
  home: "/",
  projects: "/projects",
  about: "/about",
  blog: "/blog",
  contact: "/contact",
  contacts: "/contact",
  resume: "/about#resume",
  cv: "/about#resume",
}

const files = ["about.txt", "contacts.txt", "resume.pdf", "hire-me.sh"]
const folders = ["projects/", "about/", "blog/", "contact/"]
const languages: Locale[] = ["ru", "en", "ky"]

export const promptFor = (section: string) =>
  `guest@abdillamit:${section ? `~/${section}` : "~"}$`

export const banner = (t: Translate): Line[] => [
  say("Abdillamit Mamytov · terminal", "muted"),
  say(t("banner"), "muted"),
]

const sheep = String.raw`
      _~~~~~~~_
  ___( ~ ~ ~ ~ )
 (o o ~ ~ ~ ~ ~ )
  \_/( ~ ~ ~ ~ )
      ~~~~~~~~~
      ||    ||`

export const commandNames = [
  "help",
  "whoami",
  "ls",
  "cat",
  "cd",
  "pwd",
  "projects",
  "contact",
  "cv",
  "lang",
  "date",
  "echo",
  "clear",
  "exit",
  "sudo",
  "git",
  "sheep",
]

export function runCommand(input: string, context: CommandContext): Result {
  const { t, locale, section } = context
  const [name = "", ...args] = input.trim().split(/\s+/)
  const command = name.toLowerCase()
  const arg = args.join(" ")

  const go = (to: string): Result => ({
    output: [say(`→ ${to}`, "muted")],
    action: { type: "navigate", to },
  })

  const hire = (): Result => ({
    output: [say(t("sudoPassword"), "muted"), say(t("sudoGranted"))],
    action: {
      type: "open",
      href: `${contact("email").href}?subject=${encodeURIComponent(t("mailSubject"))}`,
    },
  })

  switch (command) {
    case "":
      return { output: [] }

    case "help":
    case "?": {
      const rows: [string, string][] = [
        ["whoami", "whoami"],
        ["ls", "ls"],
        ["cat <file>", "cat"],
        ["cd <page>", "cd"],
        ["projects", "projects"],
        ["contact", "contact"],
        ["cv", "cv"],
        ["lang ru|en|ky", "lang"],
        ["clear", "clear"],
        ["exit", "exit"],
      ]
      return {
        output: [
          say(t("helpTitle")),
          ...rows.map(([usage, key]) => say(`  ${usage.padEnd(15)}${t(`help.${key}`)}`)),
          say(t("help.hint"), "muted"),
        ],
      }
    }

    case "whoami":
      return { output: [say(t("whoami")), say(context.lede)] }

    case "about":
      return runCommand("cat about.txt", context)

    case "ls":
    case "dir":
      return { output: [say([...folders, ...files].join("  "))] }

    case "pwd":
      return { output: [say(`/home/guest${section ? `/${section}` : ""}`)] }

    case "cat":
      if (!arg) return { output: [say(t("catUsage"), "error")] }
      if (arg === "about.txt") {
        return {
          output: [
            say(context.lede),
            ...context.journey.map(step => say(`${step.mark.padEnd(7)} ${step.title}`)),
          ],
        }
      }
      if (arg === "contacts.txt") return runCommand("contact", context)
      if (arg === "resume.pdf") return { output: [say(t("resumeBinary"), "error")] }
      if (arg === "hire-me.sh") {
        return {
          output: [
            say("#!/bin/sh"),
            say(t("hireComment"), "muted"),
            say(`open ${contact("email").href}`),
          ],
        }
      }
      return { output: [say(t("catMissing", { file: arg }), "error")] }

    case "cd":
    case "open": {
      const target = arg.replace(/\/$/, "").toLowerCase()
      const page = Object.hasOwn(pages, target) ? pages[target] : undefined
      if (page !== undefined) return go(page)
      const project = target.match(/^projects\/([a-z0-9-]+)$/)
      if (project) return go(`/projects/${project[1]}`)
      if (files.includes(target)) return { output: [say(t("cdNotDir", { name: arg }), "error")] }
      return { output: [say(t("cdMissing", { name: arg }), "error")] }
    }

    case "blog":
      return go("/blog")

    case "resume":
      return go("/about#resume")

    case "projects":
      return {
        output: (t.raw("work") as { name: string; text: string }[]).map(item =>
          say(`${item.name.padEnd(14)} ${item.text}`)
        ),
      }

    case "contact":
    case "contacts":
      return {
        output: (["email", "telegram", "linkedin", "github"] as const).map(id =>
          link(contact(id).label, contact(id).href, id.padEnd(10))
        ),
      }

    case "cv":
      return {
        output: [
          link(context.resumePdf.split("/").pop() ?? "cv.pdf", context.resumePdf, t("downloading")),
        ],
        action: { type: "download", href: context.resumePdf },
      }

    case "lang": {
      const target = arg.toLowerCase() as Locale
      if (!languages.includes(target)) return { output: [say(t("langCurrent"))] }
      if (target === locale) return { output: [say(t("langSame"), "muted")] }
      return {
        output: [say(`→ ${target}`, "muted")],
        action: { type: "locale", locale: target },
      }
    }

    case "date":
      return {
        output: [
          say(
            `${new Date().toLocaleString(locale === "en" ? "en-US" : "ru-RU", {
              timeZone: "Asia/Bishkek",
              dateStyle: "full",
              timeStyle: "short",
            })} (${t("city")})`
          ),
        ],
      }

    case "echo":
      return { output: [say(arg)] }

    case "clear":
    case "cls":
      return { output: [], action: { type: "clear" } }

    case "exit":
    case "quit":
    case "q":
      return { output: [], action: { type: "close" } }

    case "sudo":
      if (/^(\.\/)?hire-me(\.sh)?$/.test(arg) || arg === "hire") return hire()
      return { output: [say(t("sudoDenied"), "error")] }

    case "./hire-me.sh":
    case "hire-me":
    case "hire":
      return { output: [say(t("denied", { name }), "error")] }

    case "rm":
      return { output: [say(t("rm"), "error")] }

    case "git":
      return { output: [link("github.com/Abdillamit/abdillamit-com", sourceUrl, t("git"))] }

    case "sheep":
    case "baa":
    case "бээ":
      return { output: [say(sheep, "art"), say(t("sheep"))] }

    default:
      return { output: [say(t("unknown", { name }), "error")] }
  }
}

// Completes the word being typed. Returns the new input and, when there
// is more than one option, the options to show.
export function complete(input: string): { input: string; options: string[] } {
  const words = input.split(" ")
  const first = words[0] ?? ""
  const word = (words[words.length - 1] ?? "").toLowerCase()
  let options: string[]
  if (words.length === 1) options = commandNames
  else if (first === "cat") options = files
  else if (["cd", "open"].includes(first)) options = ["projects", "about", "blog", "contact", "resume"]
  else if (first === "lang") options = languages
  else if (first === "sudo") options = ["./hire-me.sh"]
  else options = []

  const matches = options.filter(option => option.startsWith(word))
  if (matches.length !== 1) return { input, options: matches.length > 1 ? matches : [] }
  words[words.length - 1] = matches[0] ?? word
  return { input: `${words.join(" ")} `, options: [] }
}

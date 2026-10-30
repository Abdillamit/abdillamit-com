import type { Media, Project } from "@/payload-types"

export type Tone = NonNullable<Project["tone"]>

export type CoverImage = {
  url: string
  alt: string
  width: number
  height: number
}

// What a card or a row in the project list needs. Plain data, so it can
// be passed to client components.
export type ProjectCard = {
  slug: string
  title: string
  kind: string
  role: string
  period: string
  company: string
  summary: string
  stack: string[]
  tone: Tone
  cover: CoverImage | null
}

type Size = keyof NonNullable<Media["sizes"]>

// A Media document (or just its id when not populated) as an image.
// `size` picks one of the resized copies when it exists.
export function toImage(media: unknown, size?: Size): CoverImage | null {
  if (!media || typeof media !== "object") return null
  const doc = media as Media
  const sized = size ? doc.sizes?.[size] : undefined
  const url = sized?.url ?? doc.url
  if (!url) return null
  return {
    url,
    alt: doc.alt ?? "",
    width: sized?.width ?? doc.width ?? 1600,
    height: sized?.height ?? doc.height ?? 900,
  }
}

export function toCard(project: Project): ProjectCard {
  return {
    slug: project.slug,
    title: project.title,
    kind: project.kind ?? "",
    role: project.role ?? "",
    period: project.period ?? "",
    company: project.company ?? "",
    summary: project.summary,
    stack: project.stack ?? [],
    tone: project.tone ?? "amber",
    cover: toImage(project.cover, "card"),
  }
}

// Background of a cover without an image, one per tone
export const toneGradient: Record<Tone, string> = {
  amber: "radial-gradient(120% 120% at 20% 10%, #FFA552 0%, #4A2A0E 38%, #121210 75%)",
  blue: "radial-gradient(120% 120% at 80% 20%, #8CC8FF 0%, #1A2F45 40%, #121210 78%)",
  sand: "radial-gradient(120% 120% at 30% 80%, #E9D8A6 0%, #3F3520 40%, #121210 78%)",
  green: "radial-gradient(120% 120% at 75% 75%, #9FE0B4 0%, #1F3A2A 40%, #121210 78%)",
}

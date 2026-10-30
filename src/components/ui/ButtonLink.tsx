import type { ComponentProps } from "react"

import { Link } from "@/i18n/navigation"

const variants = {
  accent: "bg-accent text-accent-ink hover:brightness-110",
  ghost:
    "border border-line-2 bg-bg/60 text-ink hover:border-line-4 hover:bg-raise-2",
} as const

type Props = ComponentProps<typeof Link> & {
  variant?: keyof typeof variants
}

// A pill-shaped link that looks like a button
export function ButtonLink({ variant = "accent", className = "", ...props }: Props) {
  return (
    <Link
      className={`inline-flex min-h-12 items-center gap-2.5 rounded-full px-5 text-[0.95rem] font-medium no-underline transition active:translate-y-px ${variants[variant]} ${className}`}
      {...props}
    />
  )
}

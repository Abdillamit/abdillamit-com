import type { ComponentProps } from "react"

import { Magnetic } from "@/components/motion/Magnetic"
import { Link } from "@/i18n/navigation"

const variants = {
  accent: "bg-accent text-accent-ink hover:brightness-110",
  ghost:
    "border border-line-2 bg-bg/60 text-ink hover:border-line-4 hover:bg-raise-2",
} as const

const base =
  "inline-flex min-h-13 w-full items-center justify-center gap-2.5 rounded-full px-6 font-medium no-underline transition-[background-color,border-color,filter,transform] duration-200 active:scale-[0.98] sm:w-auto"

type Variant = keyof typeof variants

type Props = ComponentProps<typeof Link> & {
  variant?: Variant
  magnetic?: boolean
}

// A pill-shaped link that looks like a button. On phones it takes the
// full width, like in the mobile design.
export function ButtonLink({ variant = "accent", magnetic = false, className = "", ...props }: Props) {
  const link = <Link className={`${base} ${variants[variant]} ${className}`} {...props} />
  return magnetic ? <Magnetic className="w-full sm:w-auto">{link}</Magnetic> : link
}

type AnchorProps = ComponentProps<"a"> & {
  variant?: Variant
  magnetic?: boolean
}

// The same for addresses outside the site: mail, Telegram, files
export function ButtonAnchor({ variant = "ghost", magnetic = false, className = "", ...props }: AnchorProps) {
  const anchor = <a className={`${base} ${variants[variant]} ${className}`} {...props} />
  return magnetic ? <Magnetic className="w-full sm:w-auto">{anchor}</Magnetic> : anchor
}

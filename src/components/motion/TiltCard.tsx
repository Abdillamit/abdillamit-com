"use client"

import { motion, useSpring } from "framer-motion"
import type { ComponentProps, PointerEvent, ReactNode } from "react"

import { Link } from "@/i18n/navigation"

import { usePointerEffects } from "./media"

const MotionLink = motion.create(Link)
const spring = { stiffness: 300, damping: 30 }

type Props = {
  href: ComponentProps<typeof Link>["href"]
  className?: string
  children: ReactNode
  // Largest tilt in degrees
  max?: number
}

// A card that leans towards the cursor; an amber spot follows it (the
// `spotlight` class reads --mx and --my). On touch screens it shrinks a
// little when pressed instead.
export function TiltCard({ href, max = 6, className = "", children }: Props) {
  const active = usePointerEffects()
  const rotateX = useSpring(0, spring)
  const rotateY = useSpring(0, spring)

  const onPointerMove = (event: PointerEvent<HTMLAnchorElement>) => {
    if (!active) return
    const rect = event.currentTarget.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width
    const y = (event.clientY - rect.top) / rect.height
    rotateY.set((x - 0.5) * max * 2)
    rotateX.set((0.5 - y) * max * 2)
    event.currentTarget.style.setProperty("--mx", `${x * 100}%`)
    event.currentTarget.style.setProperty("--my", `${y * 100}%`)
  }

  const onPointerLeave = () => {
    rotateX.set(0)
    rotateY.set(0)
  }

  return (
    <MotionLink
      href={href}
      className={`spotlight group ${className}`}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      whileTap={active ? undefined : { scale: 0.98 }}
    >
      {children}
    </MotionLink>
  )
}

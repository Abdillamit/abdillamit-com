"use client"

import { motion, useSpring } from "framer-motion"
import type { PointerEvent, ReactNode } from "react"

import { usePointerEffects } from "./media"

const spring = { stiffness: 220, damping: 18, mass: 0.6 }

// Pulls its child a quarter of the way towards the cursor and lets it go
// back when the cursor leaves. Mouse only.
export function Magnetic({ children, className = "" }: { children: ReactNode; className?: string }) {
  const active = usePointerEffects()
  const x = useSpring(0, spring)
  const y = useSpring(0, spring)

  const onPointerMove = (event: PointerEvent<HTMLSpanElement>) => {
    if (!active) return
    const rect = event.currentTarget.getBoundingClientRect()
    x.set((event.clientX - rect.left - rect.width / 2) * 0.25)
    y.set((event.clientY - rect.top - rect.height / 2) * 0.35)
  }

  const onPointerLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.span
      className={`inline-flex ${className}`}
      style={{ x, y }}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      {children}
    </motion.span>
  )
}

"use client"

import { MotionConfig } from "framer-motion"
import type { ReactNode } from "react"

import { SmoothScroll } from "./SmoothScroll"

// Framer Motion follows the visitor's "reduce motion" setting everywhere;
// Lenis smooths the wheel when that setting is off.
export function MotionRoot({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <SmoothScroll />
      {children}
    </MotionConfig>
  )
}

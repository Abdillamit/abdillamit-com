"use client"

import { useCallback, useSyncExternalStore } from "react"

// Live value of a CSS media query. On the server and during hydration it
// is `serverValue`, so the first client render matches the HTML.
export function useMediaQuery(query: string, serverValue = false) {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const list = window.matchMedia(query)
      list.addEventListener("change", onChange)
      return () => list.removeEventListener("change", onChange)
    },
    [query]
  )
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => serverValue
  )
}

export const FINE_POINTER = "(hover: hover) and (pointer: fine)"
export const REDUCED_MOTION = "(prefers-reduced-motion: reduce)"

// A mouse or trackpad, and the visitor has not asked for less motion:
// tilt, magnets and the cover that follows the cursor are on.
export function usePointerEffects() {
  const fine = useMediaQuery(FINE_POINTER)
  const reduced = useMediaQuery(REDUCED_MOTION, true)
  return fine && !reduced
}

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia(REDUCED_MOTION).matches

export const ease = [0.22, 1, 0.36, 1] as const

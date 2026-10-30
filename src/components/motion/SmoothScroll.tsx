"use client"

import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Lenis from "lenis"
import { useEffect } from "react"

import { FINE_POINTER, REDUCED_MOTION } from "./media"

gsap.registerPlugin(ScrollTrigger)

let lenis: Lenis | null = null

// The running instance, if smooth scrolling is on
export const getLenis = () => lenis

// Soft inertia for the mouse wheel. Lenis hands every position to GSAP,
// so ScrollTrigger and the 3D scene move in step with it. Touch screens
// and "reduce motion" keep the native scroll.
export function SmoothScroll() {
  useEffect(() => {
    if (
      !window.matchMedia(FINE_POINTER).matches ||
      window.matchMedia(REDUCED_MOTION).matches
    ) {
      return undefined
    }

    const instance = new Lenis({ lerp: 0.1, wheelMultiplier: 1, autoRaf: false, anchors: true })
    lenis = instance
    instance.on("scroll", ScrollTrigger.update)
    const tick = (time: number) => instance.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(tick)
      instance.destroy()
      lenis = null
    }
  }, [])

  return null
}

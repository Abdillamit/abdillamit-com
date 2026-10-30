"use client"

import dynamic from "next/dynamic"
import Image from "next/image"
import { useEffect, useState } from "react"

import { REDUCED_MOTION } from "@/components/motion/media"

// three.js and the scene come in a separate file, only in the browser
const GalaxyScene = dynamic(() => import("./GalaxyScene"), { ssr: false })

type Mode = "still" | "full" | "low"

type DeviceNavigator = Navigator & {
  deviceMemory?: number
  connection?: { saveData?: boolean }
}

const canUseWebGL = () => {
  try {
    const canvas = document.createElement("canvas")
    return Boolean(canvas.getContext("webgl2") ?? canvas.getContext("webgl"))
  } catch {
    return false
  }
}

// Weak phones, data saver, "reduce motion" or no WebGL: the still frame
const pickMode = (): Mode => {
  const device = navigator as DeviceNavigator
  const weak =
    (device.hardwareConcurrency ?? 8) <= 2 ||
    (device.deviceMemory ?? 8) <= 2 ||
    device.connection?.saveData === true
  if (weak || window.matchMedia(REDUCED_MOTION).matches || !canUseWebGL()) return "still"
  return window.innerWidth < 768 ? "low" : "full"
}

// The first screen's background. A picture of the same frame is in the
// HTML, so the page paints at once; the live scene replaces it when the
// browser is idle.
export function Hero3D() {
  const [mode, setMode] = useState<Mode>("still")
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const start = () => setMode(pickMode())
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(start, { timeout: 1500 })
      return () => window.cancelIdleCallback(id)
    }
    const timer = setTimeout(start, 300)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div aria-hidden="true" className="absolute inset-x-0 top-0 h-[380px] md:inset-0 md:h-auto">
      <div
        className={`absolute inset-0 transition-opacity duration-700 ${
          ready ? "opacity-0" : "opacity-100"
        }`}
      >
        <Image
          src="/hero/galaxy.webp"
          alt=""
          fill
          sizes="100vw"
          loading="eager"
          fetchPriority="high"
          className="hidden object-cover object-right md:block"
        />
        <Image
          src="/hero/galaxy-mobile.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover md:hidden"
        />
      </div>
      {mode !== "still" && (
        <GalaxyScene
          low={mode === "low"}
          align={mode === "low" ? "center" : "right"}
          onReady={() => setReady(true)}
        />
      )}
      {/* Phones: the scene fades into the page above the text */}
      <div className="absolute inset-x-0 bottom-0 h-36 bg-linear-to-b from-transparent to-bg md:hidden" />
    </div>
  )
}

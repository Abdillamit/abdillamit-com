"use client"

import type { LottieLight } from "lottie-react"
import { useEffect, useState } from "react"

import { REDUCED_MOTION, useMediaQuery } from "./media"

function StaticCheck() {
  return (
    <svg width="72" height="72" viewBox="0 0 72 72" fill="none" aria-hidden="true">
      <circle cx="36" cy="36" r="30" stroke="#FFA552" strokeWidth="2.5" />
      <path
        d="M22 37l9 9 19-20"
        stroke="#FFA552"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

// The amber ring and tick, drawn once after the form is sent. The player
// (lottie-react's light build) and /lottie/check.json load only then.
// With "reduce motion", or if the player fails to load, a still tick.
export function SentCheck() {
  const reduced = useMediaQuery(REDUCED_MOTION)
  const [Player, setPlayer] = useState<typeof LottieLight | null>(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    if (reduced) return undefined
    let active = true
    import("lottie-react")
      .then(module => {
        if (active) setPlayer(() => module.LottieLight)
      })
      .catch(() => {
        if (active) setFailed(true)
      })
    return () => {
      active = false
    }
  }, [reduced])

  return (
    <div className="size-[72px]" aria-hidden="true">
      {reduced || failed ? (
        <StaticCheck />
      ) : (
        Player && <Player src="/lottie/check.json" loop={false} />
      )}
    </div>
  )
}

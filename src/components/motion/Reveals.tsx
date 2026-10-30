"use client"

import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useEffect, useRef, type ReactNode } from "react"

import { prefersReducedMotion } from "./media"

gsap.registerPlugin(ScrollTrigger)

const START = "top 92%"

// Runs the scroll animations of one page:
//   [data-reveal]  rises 28 px and fades in when it reaches the bottom of
//                  the screen; neighbours follow each other, once
//   [data-count]   counts up from zero (with [data-suffix] after it)
// Elements already on screen when the page appears are left as they are,
// so nothing blinks after the HTML has been painted. Without JavaScript or
// with "reduce motion" everything is simply visible.
export function Reveals({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = ref.current
    if (!root || prefersReducedMotion()) return undefined

    const context = gsap.context(() => {
      const fold = window.innerHeight * 0.92
      const below = (element: Element) => element.getBoundingClientRect().top > fold

      const items = gsap.utils.toArray<HTMLElement>("[data-reveal]", root).filter(below)
      if (items.length) {
        gsap.set(items, { opacity: 0, y: 28 })
        ScrollTrigger.batch(items, {
          start: START,
          once: true,
          onEnter: batch =>
            gsap.to(batch, {
              opacity: 1,
              y: 0,
              duration: 0.9,
              ease: "expo.out",
              stagger: 0.08,
              overwrite: true,
              clearProps: "transform",
            }),
        })
      }

      gsap.utils.toArray<HTMLElement>("[data-count]", root).forEach(element => {
        const target = Number(element.dataset.count) || 0
        const suffix = element.dataset.suffix ?? ""
        const value = { current: 0 }
        element.textContent = `0${suffix}`
        ScrollTrigger.create({
          trigger: element,
          start: START,
          once: true,
          onEnter: () =>
            gsap.to(value, {
              current: target,
              duration: 1.4,
              ease: "power3.out",
              onUpdate: () => {
                element.textContent = `${Math.round(value.current)}${suffix}`
              },
            }),
        })
      })
    }, root)

    return () => context.revert()
  }, [])

  return <div ref={ref}>{children}</div>
}

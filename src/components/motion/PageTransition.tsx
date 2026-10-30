"use client"

import { AnimatePresence, motion } from "framer-motion"
import { LayoutRouterContext } from "next/dist/shared/lib/app-router-context.shared-runtime"
import { usePathname } from "next/navigation"
import { useContext, useState, type ReactNode } from "react"

import { ease } from "./media"
import { Reveals } from "./Reveals"
import { getLenis } from "./SmoothScroll"

// Keeps the old page on screen while it animates out. The App Router
// swaps the content as soon as the URL changes; holding on to the router
// context it had when it mounted lets the leaving page stay the same.
function FrozenRouter({ children }: { children: ReactNode }) {
  const context = useContext(LayoutRouterContext)
  const [frozen] = useState(context)
  if (!frozen) return children
  return (
    <LayoutRouterContext.Provider value={frozen}>{children}</LayoutRouterContext.Provider>
  )
}

// Page changes: the old page rises and fades out, a thin amber line runs
// across the top, the new page comes up from below. The header stays.
// With "reduce motion" MotionConfig turns this into a plain swap.
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const [shown, setShown] = useState(pathname)
  const [sweeps, setSweeps] = useState(0)

  if (pathname !== shown) {
    setShown(pathname)
    setSweeps(count => count + 1)
  }

  const toTop = () => {
    if (window.location.hash) return
    getLenis()?.scrollTo(0, { immediate: true })
    window.scrollTo(0, 0)
  }

  return (
    <>
      {sweeps > 0 && (
        <motion.span
          key={sweeps}
          aria-hidden="true"
          className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-accent shadow-[0_0_12px_rgba(255,165,82,0.6)]"
          initial={{ scaleX: 0, opacity: 1 }}
          animate={{ scaleX: 1, opacity: 0 }}
          transition={{
            scaleX: { duration: 0.5, ease },
            opacity: { duration: 0.25, delay: 0.5 },
          }}
        />
      )}
      <AnimatePresence mode="wait" initial={false} onExitComplete={toTop}>
        <motion.div
          key={pathname}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.45, ease } }}
          exit={{ opacity: 0, y: -16, transition: { duration: 0.3, ease } }}
        >
          <Reveals>
            <FrozenRouter>{children}</FrozenRouter>
          </Reveals>
        </motion.div>
      </AnimatePresence>
    </>
  )
}

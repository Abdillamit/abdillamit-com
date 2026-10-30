"use client"

import { AnimatePresence, motion, useSpring } from "framer-motion"
import { useRef, useState, type PointerEvent } from "react"

import { ease, usePointerEffects } from "@/components/motion/media"
import { Link } from "@/i18n/navigation"
import type { ProjectCard } from "@/lib/projects"

import { ProjectCover } from "./ProjectCover"
import { ProjectTile } from "./ProjectTile"

type Labels = { view: string; cards: string; list: string; open: string }

const meta = (project: ProjectCard) =>
  [project.role, project.company].filter(Boolean).join(" · ")

// The list view: a row per project. With a mouse, the cover of the row
// under the cursor follows it and leans the way it moves.
function ProjectRows({ projects }: { projects: ProjectCard[] }) {
  const follow = usePointerEffects()
  const host = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState<number | null>(null)
  const x = useSpring(0, { stiffness: 350, damping: 35 })
  const y = useSpring(0, { stiffness: 350, damping: 35 })
  const rotate = useSpring(0, { stiffness: 200, damping: 20 })
  const lastX = useRef(0)

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!follow || !host.current) return
    const rect = host.current.getBoundingClientRect()
    const nextX = event.clientX - rect.left
    rotate.set(Math.max(-8, Math.min(8, (nextX - lastX.current) * 0.4)))
    lastX.current = nextX
    x.set(nextX)
    y.set(event.clientY - rect.top)
  }

  return (
    <div
      ref={host}
      className="relative border-t border-line-2"
      onPointerMove={onPointerMove}
      onPointerLeave={() => setActive(null)}
    >
      <ul>
        {projects.map((project, index) => (
          <li key={project.slug} className="border-b border-line">
            <Link
              href={`/projects/${project.slug}`}
              onPointerEnter={() => setActive(index)}
              onFocus={() => setActive(null)}
              className="group grid grid-cols-[2rem_minmax(0,1fr)_1.5rem] items-center gap-x-4 gap-y-1 py-6 no-underline transition-[padding] duration-400 ease-soft md:grid-cols-[3.5rem_minmax(0,1.2fr)_minmax(0,1fr)_minmax(0,1fr)_2rem] md:gap-6 md:py-8 md:hover:pl-5"
            >
              <span className="font-mono text-xs text-muted">{String(index + 1).padStart(2, "0")}</span>
              <span className="text-[1.75rem] leading-none font-medium tracking-[-0.035em] transition-colors group-hover:text-accent md:text-[2.75rem]">
                {project.title}
              </span>
              <span className="col-start-2 font-mono text-xs tracking-[0.08em] text-accent uppercase md:col-start-auto md:text-[0.8125rem]">
                {project.kind}
              </span>
              <span className="col-start-2 text-sm text-soft md:col-start-auto">{meta(project)}</span>
              <span
                aria-hidden="true"
                className="col-start-3 row-start-1 text-2xl text-soft transition-[transform,color] duration-400 ease-soft group-hover:translate-x-1.5 group-hover:text-accent md:col-start-auto md:row-start-auto"
              >
                →
              </span>
            </Link>
          </li>
        ))}
      </ul>

      {follow && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute top-0 left-0 z-10 h-[13.75rem] w-80 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl border border-line-2 shadow-[0_24px_60px_rgba(0,0,0,0.55)]"
          style={{ x, y, rotate }}
          initial={false}
          animate={{ opacity: active === null ? 0 : 1, scale: active === null ? 0.9 : 1 }}
          transition={{ duration: 0.25 }}
        >
          {projects.map((project, index) => (
            <div
              key={project.slug}
              className={`absolute inset-0 transition-opacity duration-200 ${
                active === index ? "opacity-100" : "opacity-0"
              }`}
            >
              <ProjectCover
                title={project.title}
                tone={project.tone}
                image={project.cover}
                sizes="320px"
                className="h-full"
              />
            </div>
          ))}
        </motion.div>
      )}
    </div>
  )
}

// Cards or a list
export function ProjectsView({ projects, labels }: { projects: ProjectCard[]; labels: Labels }) {
  const [view, setView] = useState<"cards" | "list">("cards")

  const button = (value: "cards" | "list", label: string) => (
    <button
      type="button"
      aria-pressed={view === value}
      onClick={() => setView(value)}
      className={`min-h-10 rounded-full px-4 text-sm transition-colors ${
        view === value ? "bg-pressed text-ink" : "text-soft hover:text-ink"
      }`}
    >
      {label}
    </button>
  )

  return (
    <div className="flex flex-col gap-8">
      <div role="group" aria-label={labels.view} className="flex self-start rounded-full border border-line-2 p-1">
        {button("cards", labels.cards)}
        {button("list", labels.list)}
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={view}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.4, ease } }}
          exit={{ opacity: 0, y: -8, transition: { duration: 0.2 } }}
        >
          {view === "cards" ? (
            <div className="grid gap-4 md:grid-cols-2 md:gap-5">
              {projects.map((project, index) => (
                <ProjectTile
                  key={project.slug}
                  project={project}
                  meta={meta(project)}
                  openLabel={labels.open}
                  priority={index < 2}
                />
              ))}
            </div>
          ) : (
            <ProjectRows projects={projects} />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

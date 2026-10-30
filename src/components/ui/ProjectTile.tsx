import { TiltCard } from "@/components/motion/TiltCard"
import type { ProjectCard } from "@/lib/projects"

import { ProjectCover } from "./ProjectCover"

type Props = {
  project: ProjectCard
  // Right side of the label row: the role, or the role and the company
  meta: string
  openLabel: string
  priority?: boolean
}

// A project card for the home page and the project list
export function ProjectTile({ project, meta, openLabel, priority }: Props) {
  return (
    <div data-reveal="" className="flex">
      <TiltCard
        href={`/projects/${project.slug}`}
        className="flex w-full flex-col overflow-hidden rounded-2xl border border-line no-underline transition-colors hover:border-line-3 md:rounded-[18px]"
      >
        <ProjectCover
          title={project.title}
          tone={project.tone}
          image={project.cover}
          sizes="(min-width: 1200px) 560px, (min-width: 768px) 50vw, 100vw"
          priority={priority}
          className="h-45 border-b border-line md:h-65"
        />
        <div className="flex flex-1 flex-col gap-3 p-[1.125rem] md:px-6 md:pt-6 md:pb-6.5">
          <div className="flex justify-between gap-4 font-mono text-[0.6875rem] tracking-[0.08em] uppercase">
            <span className="text-accent">{project.kind}</span>
            <span className="text-right text-muted">{meta}</span>
          </div>
          {project.cover && (
            <h3 className="font-mono text-xl font-medium tracking-tight">{project.title}</h3>
          )}
          <p className="text-[0.9375rem] text-soft md:text-base">{project.summary}</p>
          <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-1">
            <ul className="flex flex-wrap gap-1.5">
              {project.stack.slice(0, 4).map(item => (
                <li key={item} className="chip">
                  {item}
                </li>
              ))}
            </ul>
            <span className="hidden text-ink md:inline">
              {openLabel} <span aria-hidden="true">→</span>
            </span>
          </div>
        </div>
      </TiltCard>
    </div>
  )
}

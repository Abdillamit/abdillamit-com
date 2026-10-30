import type { ReactNode } from "react"

type Props = {
  id: string
  eyebrow: string
  title: string
  // "[ 01 / 03 ]" before the eyebrow on the home page
  step?: { index: number; total: number }
  aside?: ReactNode
}

const two = (value: number) => String(value).padStart(2, "0")

// Eyebrow and heading at the top of a section
export function SectionHead({ id, eyebrow, title, step, aside }: Props) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-6">
      <div data-reveal="" className="flex flex-col gap-3 md:gap-4">
        <p className="eyebrow">
          {step && (
            <>
              [ <span className="text-accent">{two(step.index)}</span> / {two(step.total)} ] ·{" "}
            </>
          )}
          {eyebrow}
        </p>
        <h2
          id={id}
          className="text-[2.125rem] leading-[1.05] font-medium tracking-[-0.035em] md:text-[clamp(2.25rem,4vw,3.375rem)] md:leading-[1.04]"
        >
          {title}
        </h2>
      </div>
      {aside}
    </div>
  )
}

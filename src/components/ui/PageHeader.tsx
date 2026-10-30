import type { ReactNode } from "react"

// Title block at the top of inner pages
export function PageHeader({ title, lede }: { title: string; lede?: ReactNode }) {
  return (
    <header className="border-b border-line">
      <div className="frame flex flex-col gap-5 px-5 pt-20 pb-14 md:px-12 md:pt-24">
        <h1 className="animate-rise text-[clamp(2.75rem,7vw,5rem)] leading-none font-medium tracking-[-0.045em]">
          {title}
        </h1>
        {lede && (
          <p className="max-w-2xl animate-rise text-lg text-soft [animation-delay:0.1s]">
            {lede}
          </p>
        )}
      </div>
    </header>
  )
}

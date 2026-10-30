import Image from "next/image"

import { toneGradient, type CoverImage, type Tone } from "@/lib/projects"

type Props = {
  title: string
  tone: Tone
  image: CoverImage | null
  sizes: string
  // Show the project name over a cover without an image
  label?: boolean
  priority?: boolean
  className?: string
}

// The picture of a project: a screenshot from the CMS, or a coloured
// gradient with a dot grid while there is none.
export function ProjectCover({
  title,
  tone,
  image,
  sizes,
  label = true,
  priority = false,
  className = "",
}: Props) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div
        className="absolute inset-0 transition-transform duration-[800ms] ease-soft group-hover:scale-[1.04]"
        style={image ? undefined : { background: toneGradient[tone] }}
      >
        {image && (
          <Image
            src={image.url}
            alt={image.alt}
            fill
            sizes={sizes}
            loading={priority ? "eager" : "lazy"}
            className="object-cover"
          />
        )}
      </div>
      {!image && (
        <>
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(rgba(238,235,228,0.12)_1px,transparent_1px)] bg-[length:14px_14px]"
          />
          {label && (
            <span className="absolute bottom-4 left-5 font-mono text-[1.375rem] font-medium tracking-tight text-ink md:bottom-5 md:left-6 md:text-[1.75rem]">
              {title}
            </span>
          )}
        </>
      )}
    </div>
  )
}

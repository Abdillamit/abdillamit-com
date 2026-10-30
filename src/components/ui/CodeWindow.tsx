"use client"

import { useState } from "react"

import { stackFiles } from "@/lib/site"

type Kind = "comment" | "key" | "string" | "keyword" | "punct" | "plain"

const keywords = new Set(["export", "const", "as"])

const colors: Record<Kind, string> = {
  comment: "text-muted",
  key: "text-keyword",
  string: "text-accent",
  keyword: "text-keyword",
  punct: "text-muted",
  plain: "text-ink",
}

// Splits one line of TypeScript or JSON into coloured pieces. Enough for
// the two files in lib/site.ts, not a real highlighter.
function tokenize(line: string): { text: string; kind: Kind }[] {
  if (line.trim().startsWith("//")) return [{ text: line, kind: "comment" }]
  const pattern = /"[^"]*"|[A-Za-z_$][\w$]*|[{}[\](),:]|\s+|[^\s]/g
  const tokens: { text: string; kind: Kind }[] = []
  let match: RegExpExecArray | null
  while ((match = pattern.exec(line))) {
    const piece = match[0]
    const isKey = line.slice(pattern.lastIndex).trimStart().startsWith(":")
    let kind: Kind = "plain"
    if (piece.startsWith('"')) kind = isKey ? "key" : "string"
    else if (keywords.has(piece)) kind = "keyword"
    else if (/^[{}[\](),:]$/.test(piece)) kind = "punct"
    else if (isKey) kind = "key"
    tokens.push({ text: piece, kind })
  }
  return tokens
}

// An editor-like window with file tabs and line numbers
export function CodeWindow({ label }: { label: string }) {
  const [activeId, setActiveId] = useState(stackFiles[0]?.id)
  const file = stackFiles.find(item => item.id === activeId) ?? stackFiles[0]
  if (!file) return null

  return (
    <div className="overflow-hidden rounded-2xl border border-line-2 bg-bg-deep">
      <div className="flex items-center justify-between gap-4 border-b border-line px-2 py-1.5">
        <div role="group" aria-label={label} className="flex gap-1">
          {stackFiles.map(item => (
            <button
              key={item.id}
              type="button"
              aria-pressed={item.id === file.id}
              onClick={() => setActiveId(item.id)}
              className={`min-h-10 rounded-lg px-3 font-mono text-xs transition-colors ${
                item.id === file.id ? "bg-pressed text-ink" : "text-soft hover:text-ink"
              }`}
            >
              {item.name}
            </button>
          ))}
        </div>
        <span className="pr-2 font-mono text-[0.6875rem] text-muted">[ {file.language} ]</span>
      </div>
      {/* Focusable so the code can be scrolled sideways from the keyboard */}
      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex */}
      <pre tabIndex={0} aria-label={file.name} className="overflow-x-auto py-4 font-mono text-[0.8125rem] leading-[1.7]">
        <code>
          {file.lines.map((line, index) => (
            <span key={`${file.id}-${index}`} className="block pr-5">
              <span aria-hidden="true" className="inline-block w-10 pr-4 text-right text-line-4 select-none">
                {index + 1}
              </span>
              {tokenize(line).map((token, position) => (
                <span key={position} className={colors[token.kind]}>
                  {token.text}
                </span>
              ))}
            </span>
          ))}
        </code>
      </pre>
    </div>
  )
}

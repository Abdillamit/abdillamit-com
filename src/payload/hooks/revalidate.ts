import { revalidatePath } from "next/cache"
import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
} from "payload"

// Content changed in the admin panel: pages of the site are built once
// and cached, so drop the cache and let them be built again with the new
// content. The site is small, so everything is dropped at once.
const rebuild = () => {
  try {
    revalidatePath("/", "layout")
  } catch {
    // Not inside a Next.js server (the seed script): nothing to drop
  }
}

export const revalidateAfterChange: CollectionAfterChangeHook = ({ doc }) => {
  rebuild()
  return doc
}

export const revalidateAfterDelete: CollectionAfterDeleteHook = ({ doc }) => {
  rebuild()
  return doc
}

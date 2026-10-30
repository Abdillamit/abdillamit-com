import type { Access, FieldAccess, Where } from "payload"

// Roles: admin manages everything, editor edits content (projects,
// posts, media) but not users or messages.
export type Role = "admin" | "editor"

type MaybeUser = { role?: Role | null } | null | undefined

const roleOf = (user: unknown): Role | undefined =>
  (user as MaybeUser)?.role ?? undefined

export const isAdmin: Access = ({ req }) => roleOf(req.user) === "admin"

export const isStaff: Access = ({ req }) => {
  const role = roleOf(req.user)
  return role === "admin" || role === "editor"
}

export const isAdminField: FieldAccess = ({ req }) =>
  roleOf(req.user) === "admin"

// Admins see every user, others only themselves
export const isAdminOrSelf: Access = ({ req }) => {
  if (!req.user) return false
  if (roleOf(req.user) === "admin") return true
  const self: Where = { id: { equals: req.user.id } }
  return self
}

// Visitors see published documents only; logged-in staff see drafts too
export const publishedOrStaff: Access = ({ req }) => {
  if (req.user) return true
  const published: Where = { _status: { equals: "published" } }
  return published
}

export const anyone: Access = () => true
export const nobody: Access = () => false

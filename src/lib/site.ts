// Facts about the site and its owner that do not depend on the language.

export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://abdillamit.dev"
).replace(/\/$/, "")

export const owner = {
  name: "Abdillamit Mamytov",
  email: "abdillamit08@gmail.com",
}

export const contacts = [
  {
    id: "email",
    label: owner.email,
    href: `mailto:${owner.email}`,
  },
  {
    id: "github",
    label: "github.com/Abdillamit",
    href: "https://github.com/Abdillamit",
  },
  {
    id: "linkedin",
    label: "linkedin.com/in/abdillamit-mamytov",
    href: "https://www.linkedin.com/in/abdillamit-mamytov",
  },
  {
    id: "telegram",
    label: "t.me/Abd1llamit",
    href: "https://t.me/Abd1llamit",
  },
] as const

export const sourceUrl = "https://github.com/Abdillamit/abdillamit-com"

// The same in every language; the group names are translated in messages
export const stack = {
  frontend: [
    "React",
    "TypeScript",
    "Gatsby",
    "Apollo Client",
    "Redux",
    "RxJS",
    "Styletron",
  ],
  backend: ["Node.js", "GraphQL", "REST", "RBAC"],
  aws: [
    "Lambda",
    "AppSync",
    "API Gateway",
    "DynamoDB",
    "Cognito",
    "S3",
    "CloudFront",
    "CloudWatch",
    "OpenSearch",
  ],
  tools: ["Jest", "React Testing Library", "Cypress", "Git", "GitHub Actions"],
} as const

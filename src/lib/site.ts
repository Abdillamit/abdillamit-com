// Facts about the site and its owner that do not depend on the language.

export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://abdillamit.dev"
).replace(/\/$/, "")

export const owner = {
  name: "Abdillamit Mamytov",
  email: "abdillamit08@gmail.com",
}

// `id` is also the key of the row label in messages (Contact.rows)
export const contacts = [
  {
    id: "email",
    label: owner.email,
    short: owner.email,
    href: `mailto:${owner.email}`,
  },
  {
    id: "telegram",
    label: "t.me/Abd1llamit",
    short: "t.me/Abd1llamit",
    href: "https://t.me/Abd1llamit",
  },
  {
    id: "linkedin",
    label: "linkedin.com/in/abdillamit-mamytov",
    short: "in/abdillamit-mamytov",
    href: "https://www.linkedin.com/in/abdillamit-mamytov",
  },
  {
    id: "github",
    label: "github.com/Abdillamit",
    short: "github.com/Abdillamit",
    href: "https://github.com/Abdillamit",
  },
] as const

export type ContactId = (typeof contacts)[number]["id"]

export const contact = (id: ContactId) =>
  contacts.find(item => item.id === id) ?? contacts[0]

export const sourceUrl = "https://github.com/Abdillamit/abdillamit-com"
export const claudeCodeUrl = "https://claude.com/claude-code"

// The running line under the first screen
export const marquee = [
  "React",
  "TypeScript",
  "Apollo GraphQL",
  "Redux",
  "RxJS",
  "Node.js",
  "AWS Lambda",
  "AppSync",
  "DynamoDB",
  "Cognito",
  "Jest",
  "Cypress",
]

// Files in the code window of the Stack section on the About page
export const stackFiles = [
  {
    id: "profile",
    name: "profile.ts",
    language: "TypeScript",
    lines: [
      "// profile.ts",
      "export const abu = {",
      '  name: "Abdillamit Mamytov",',
      '  role: "Full Stack Software Engineer",',
      '  based: "Bishkek, Kyrgyzstan",',
      '  frontend: ["React", "TypeScript", "Gatsby", "Apollo", "RxJS"],',
      '  backend: ["Node.js", "GraphQL"],',
      '  cloud: ["Lambda", "AppSync", "DynamoDB", "Cognito", "S3"],',
      '  tests: ["Jest", "React Testing Library", "Cypress"],',
      '  mentor: "20+ students at Mancho School",',
      "} as const",
    ],
  },
  {
    id: "aws",
    name: "aws.json",
    language: "JSON",
    lines: [
      "{",
      '  "experience": "2+ years in fintech and logistics",',
      '  "aws": [',
      '    "AppSync", "Cognito", "IAM", "Lambda",',
      '    "API Gateway", "DynamoDB", "S3", "CloudFront",',
      '    "CloudWatch", "OpenSearch", "EC2", "EventBridge",',
      '    "CloudFormation", "CodePipeline", "Route 53"',
      "  ]",
      "}",
    ],
  },
]

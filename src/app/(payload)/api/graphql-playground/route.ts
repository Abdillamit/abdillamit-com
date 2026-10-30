/* GraphQL playground, only for logged-in users in development */
import config from "@payload-config"
import "@payloadcms/next/css"
import { GRAPHQL_PLAYGROUND_GET } from "@payloadcms/next/routes"

export const GET = GRAPHQL_PLAYGROUND_GET(config)

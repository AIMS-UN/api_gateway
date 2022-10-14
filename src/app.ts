import { ApolloServer } from 'apollo-server-express'
import { buildSchema } from 'type-graphql'

import { authChecker } from '@/services/accounts'
import { resolvers } from '@/resolvers/index'

// Setup Apollo Server
export const startServer = async (): Promise<ApolloServer> => {
  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers,
      authChecker
    }),
    context: ({ req, res }) => ({ req, res })
  })
  await server.start()
  return server
}

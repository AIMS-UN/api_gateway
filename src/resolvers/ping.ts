import { Query, Resolver } from 'type-graphql'

@Resolver()
export class PingResolver {
  @Query(() => String)
  ping (): string {
    return 'pong'
  }

  @Query(() => String)
  pong (): string {
    return 'ping'
  }
}

import { Arg, Query, Resolver } from 'type-graphql'
import { getData } from '@/services/data'
import { Data } from '@/schemas/data'

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

  @Query(() => Data)
  async getData (@Arg('msName') msName: string): Promise<Data> {
    return await getData(msName)
  }
}

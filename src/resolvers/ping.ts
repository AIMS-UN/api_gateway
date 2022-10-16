import { Arg, Authorized, Ctx, Query, Resolver } from 'type-graphql'
import { ExpressContext } from 'apollo-server-express'

import { getData } from '@/services/data'
import { Data } from '@/schemas/data'
import { User } from '@/schemas/accounts'

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

  @Authorized()
  @Query(() => String)
  async pingAuth (@Ctx() context: ExpressContext): Promise<string> {
    const { user } = context.res.locals as { user: User }
    return `pong ${user.role} with id ${user.id}`
  }

  @Authorized('student')
  @Query(() => String)
  async pingStudent (@Ctx() context: ExpressContext): Promise<string> {
    const { user } = context.res.locals as { user: User }
    return `pong student with id ${user.id}`
  }

  @Authorized('teacher')
  @Query(() => String)
  async pingTeacher (@Ctx() context: ExpressContext): Promise<string> {
    const { user } = context.res.locals as { user: User }
    return `pong teacher with id ${user.id}`
  }
}

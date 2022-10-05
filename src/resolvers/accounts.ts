import { Arg, Mutation, Query, Resolver, Ctx} from 'type-graphql'
import { User, Session } from '@/schemas/accounts'
import { getUserByUsername, loginUser, registerUser } from '@/services/accounts'
import { ExpressContext } from 'apollo-server-express'

@Resolver()
export class AccountResolver {
  @Query(() => User)
  async getUser (@Arg('username') username: string, @Ctx() context: ExpressContext): Promise<User> {
    const pop = await getUserByUsername(username, context.req.headers.authorization)
    console.log(JSON.stringify(pop))
    return pop
  }

  @Mutation(() => Session)
  async logUser (
    @Arg('username') username: string,
      @Arg('password') password: string): Promise<Session> {
    return await loginUser(username, password)
  }

  @Mutation(() => Session)
  async regUser (
    @Arg('username') username: string,
      @Arg('password') password: string,
      @Arg('role') role: string): Promise<Session> {
    return await registerUser(username, password, role)
  }
}

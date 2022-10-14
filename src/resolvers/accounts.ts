import { Arg, Mutation, Query, Resolver, Ctx, Authorized } from 'type-graphql'
import { ExpressContext } from 'apollo-server-express'

import { User } from '@/schemas/accounts'
import { loginUser, logoutUser, registerUser } from '@/services/accounts'

@Resolver()
export class AccountResolver {
  @Authorized()
  @Query(() => User)
  async myAccount (@Ctx() context: ExpressContext): Promise<User> {
    const { user } = context.res.locals as { user: User }
    return await new Promise((resolve) => { resolve(user) })
  }

  @Mutation(() => User)
  async login (
    @Arg('username') username: string,
      @Arg('password') password: string,
      @Ctx() context: ExpressContext): Promise<User> {
    const session = context.req.session
    return await loginUser(username, password, session)
  }

  @Mutation(() => User)
  async register (
    @Arg('username') username: string,
      @Arg('password') password: string,
      @Arg('role') role: string,
      @Ctx() context: ExpressContext): Promise<User> {
    const session = context.req.session
    return await registerUser(username, password, role, session)
  }

  @Authorized()
  @Mutation(() => Boolean)
  async logout (@Ctx() context: ExpressContext): Promise<boolean> {
    const session = context.req.session
    return await logoutUser(session)
  }
}

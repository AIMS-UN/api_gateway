import { Arg, Mutation, Query, Resolver, Ctx, Authorized } from 'type-graphql'
import { ExpressContext } from 'apollo-server-express'

import { Login, User } from '@/schemas/accounts'
import * as accountService from '@/services/accounts'

@Resolver()
export class AccountResolver {
  @Authorized()
  @Query(() => User)
  async myAccount (@Ctx() context: ExpressContext): Promise<User> {
    const { user } = context.res.locals as { user: User }
    return user
  }

  @Mutation(() => Login)
  async login (
    @Arg('username') username: string,
      @Arg('password') password: string): Promise<Login> {
    return await accountService.loginUser(username, password)
  }

  @Mutation(() => Login)
  async register (
    @Arg('username') username: string,
      @Arg('password') password: string,
      @Arg('role') role: string): Promise<Login> {
    return await accountService.registerUser(username, password, role)
  }

  @Authorized()
  @Mutation(() => Boolean)
  async logout (@Ctx() context: ExpressContext): Promise<boolean> {
    const session = context.req.session
    return await accountService.logoutUser(session)
  }

  @Authorized()
  @Mutation(() => User)
  async updateUser (
    @Arg('username') username: string,
      @Arg('password') password: string,
      @Arg('role') role: string,
      @Ctx() context: ExpressContext): Promise<User> {
    const token = context.req.headers.authorization
    if (token == null) return { id: '0', username: 'NO_TOKEN_FOUND', role: '' }
    return await accountService.updateUser(username, password, role, token)
  }

  @Authorized('teacher')
  @Mutation(() => User)
  async getUserByID (
    @Arg('userID') userID: string,
      @Ctx() context: ExpressContext): Promise<User> {
    const token = context.req.headers.authorization
    if (token == null) return { id: '0', username: 'NO_TOKEN_FOUND', role: '' }
    return await accountService.getUserByID(userID, token)
  }
}

import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql'

import * as profileService from '@/services/profile'
import { Profile, ProfileInput } from '@/schemas/profile'
import { ExpressContext } from 'apollo-server-express'
import { User } from '@/schemas/accounts'

@Resolver()
export class ProfileResolver {
  @Authorized()
  @Query(() => [Profile])
  async getProfiles (): Promise<Profile[]> {
    return await profileService.getProfiles()
  }

  @Authorized()
  @Query(() => Profile)
  async getProfilesById (
    @Arg('user_id') userId: string,
      @Ctx() context: ExpressContext
  ): Promise<Profile | string> {
    const token = context.req.headers.authorization
    if (token == null) return 'NO_TOKEN_FOUND'
    return await profileService.getProfilesById(userId, token)
  }

  @Authorized()
  @Query(() => Profile)
  async getMyProfile (@Ctx() context: ExpressContext): Promise<Profile> {
    const { user } = context.res.locals as { user: User }
    return await profileService.getMyProfile(user.id)
  }

  @Authorized()
  @Mutation(() => String)
  async createProfile (@Arg('profileInput') profileInput: ProfileInput,
    @Ctx() context: ExpressContext): Promise<string> {
    const { user } = context.res.locals as { user: User }
    return await profileService.createProfile(user.id, profileInput)
  }

  @Authorized()
  @Mutation(() => String)
  async updateProfile (
    @Arg('profileInput') profileInput: ProfileInput,
      @Ctx() context: ExpressContext
  ): Promise<string> {
    const { user } = context.res.locals as { user: User }
    return await profileService.updateProfile(user.id, profileInput)
  }

  @Authorized()
  @Mutation(() => String)
  async deleteProfile (@Ctx() context: ExpressContext): Promise<string> {
    const { user } = context.res.locals as { user: User }
    return await profileService.deleteProfile(user.id)
  }
}

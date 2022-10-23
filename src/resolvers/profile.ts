import { Arg, Query, Resolver } from 'type-graphql'

import * as profileService from '@/services/profile'
import { Profile } from '@/schemas/profile'

@Resolver()
export class ProfileResolver {
  @Query(() => [Profile])
  async getProfiles (): Promise<Profile[]> {
    return await profileService.getProfiles()
  }

  @Query(() => Profile)
  async getProfilesById (@Arg('user_id') userId: string): Promise<Profile> {
    return await profileService.getProfilesById(userId)
  }
}

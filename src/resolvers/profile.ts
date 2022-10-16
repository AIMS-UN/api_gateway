import { Arg, Query, Resolver } from 'type-graphql'
import { Profile } from '@/schemas/profile'
import * as profileService from '@/services/profile'

@Resolver()
export class ProfileResolver {
  @Query(() => [Profile])
  async getProfiles (): Promise<Profile[]> {
    const a = await profileService.getProfiles()
    return a
  }

  @Query(() => Profile)
  async getProfilesById (@Arg('user_id') userId: string): Promise<Profile> {
    return await profileService.getProfilesById(userId)
  }
}

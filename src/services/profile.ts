import { Profile } from '@/schemas/profile'
import { getInstance } from '@/configs/axios'

const profileMS = getInstance('profile')

export const getProfilesById = async (userId: string): Promise<Profile> => {
  const { data } = await profileMS.get(`/profiles/${userId}`)

  return data
}

export const getProfiles = async (): Promise<Profile[]> => {
  const { data } = await profileMS.get('/profiles')

  return data
}

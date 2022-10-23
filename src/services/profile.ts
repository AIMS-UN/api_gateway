import { Profile } from '@/schemas/profile'
import { getInstance } from '@/configs/axios'

const profileInstance = getInstance('profile')

export const getProfilesById = async (userId: string): Promise<Profile> => {
  const { data } = await profileInstance.get(`/profiles/${userId}`)

  return data
}

export const getProfiles = async (): Promise<Profile[]> => {
  const { data } = await profileInstance.get('/profiles')

  return data
}

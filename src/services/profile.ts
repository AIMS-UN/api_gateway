import { getInstance } from '@/configs/axios'
import { Profile } from '@/schemas/profile'

const profileInstance = getInstance('profile')

export const getProfilesById = async (userId: string): Promise<Profile> => {
  const { data } = await profileInstance.get(`/profiles/${userId}`)

  return await new Promise((resolve) => { resolve(data) })
}

export const getProfiles = async (): Promise<Profile[]> => {
  const { data } = await profileInstance.get('/profiles')

  return await new Promise((resolve) => { resolve(data) })
}

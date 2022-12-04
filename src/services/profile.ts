import { Profile, ProfileInput } from '@/schemas/profile'
import { getInstance } from '@/configs/axios'
import * as accountService from '@/services/accounts'

const profileMS = getInstance('profile')

export const getProfilesById = async (userId: string, token: string): Promise<Profile | string> => {
  const user = await accountService.getUserByID(userId, token)

  if (user == null) {
    console.error(`User with id ${userId} does not exist`)
    return 'User does not exist'
  }

  const { data } = await profileMS.get(`/profiles/${userId}`)

  return data
}

export const getMyProfile = async (userId: string): Promise<Profile> => {
  const { data } = await profileMS.get(`/profiles/${userId}`)

  return data
}

export const getProfiles = async (): Promise<Profile[]> => {
  const { data } = await profileMS.get('/profiles')

  return data
}

export const createProfile = async (userId: string, profileInput: ProfileInput): Promise<string> => {
  const { data } = await profileMS.post('/profiles', { user_id: userId, ...profileInput })

  if (data == null) {
    console.error('Error creating profile')
    return 'Error creating profile'
  }

  return 'Profile created'
}

export const updateProfile = async (userId: string, profileInput: ProfileInput): Promise<string> => {
  const { data } = await profileMS.put(`/profiles/${userId}`, profileInput)

  if (data == null) {
    console.error('Error updating profile')
    return 'Error updating profile'
  }

  return 'Profile updated'
}

export const deleteProfile = async (userId: string): Promise<string> => {
  const { data } = await profileMS.delete(`/profiles/${userId}`)

  if (data == null) {
    console.error('Error deleting profile')
    return 'Error deleting profile'
  }

  return 'Profile deleted'
}

import { getInstance } from '@/configs/axios'
import { User } from '@/schemas/accounts'

const accountMS = getInstance('enrollment')

export const loginUser = async (username: string, password: string): Promise<{ token: string, user: User }> => {
  const { token, data } = await accountMS.post('/auth/login', { username, password })
  const { user } = data

  return await new Promise((resolve) => { resolve({ token, user }) })
}

export const registerUser = async (username: string, password: string, role: String): Promise<{ token: string, user: User }> => {
  const { token, data } = await accountMS.post('/auth/register', { username, password, role })
  const { user } = data

  return await new Promise((resolve) => { resolve({ token, user }) })
}

export const getUserByUsername = async (username: string): Promise<User> => {
  const { data } = await accountMS.get('/accounts' + username)
  const { user } = data

  return await new Promise((resolve) => { resolve(user) })
}

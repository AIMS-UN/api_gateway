import { getInstance } from '@/configs/axios'
import { User, Session } from '@/schemas/accounts'

const accountMS = getInstance('account')

export const loginUser = async (username: string, password: string): Promise<Session> => {
  const { data } = await accountMS.post('/auth/login', { username, password })
  const logged = { token: data.token, user: data.data }

  return await new Promise((resolve) => { resolve(logged) })
}

export const registerUser = async (username: string, password: string, role: string): Promise<Session> => {
  const { data } = await accountMS.post('/auth/register', { username, password, role })
  const regged = { token: data.token, user: data.data }

  return await new Promise((resolve) => { resolve(regged) })
}

export const getUserByUsername = async (username: string, token: string): Promise<User> => {
  const { data } = await accountMS.get('/accounts', {
    headers: {
      Authorization: `Bearer ${token}`
    },
    data: {
      username
    }
  })

  return await new Promise((resolve) => { resolve(data.data) })
}

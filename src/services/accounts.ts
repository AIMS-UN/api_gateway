import { AuthChecker } from 'type-graphql'
import { ExpressContext } from 'apollo-server-express'

import { Login, User } from '@/schemas/accounts'
import { getInstance } from '@/configs/axios'

const accountMS = getInstance('account')

export const loginUser = async (username: string, password: string): Promise<Login> => {
  const body = { username, password }

  const { data: { data, token } } = await accountMS.post('/auth/login', body)

  return { token, user: data }
}

export const registerUser = async (
  username: string,
  password: string,
  role: string
): Promise<Login> => {
  const body = { username, password, role }

  const { data: { data, token } } = await accountMS.post('/auth/register', body)

  return { token, user: data }
}

export const logoutUser = async (): Promise<boolean> => {
  return true
}

export const authChecker: AuthChecker<ExpressContext> = async ({ context: { req, res } }, roles): Promise<boolean> => {
  const token = req.headers.authorization
  if (token == null) return false

  const headers = { Authorization: token }

  const { data: { data } } = await accountMS.get('/accounts', { headers })

  res.locals.user = data

  if (roles.length === 0) return true

  if (roles.includes(data.role)) return true

  return false
}

export const updateUser = async (
  username: string,
  password: string,
  role: string,
  token: string
): Promise<User> => {
  const body = { username, password, role }
  const headers = { Authorization: token ?? '' }

  const { data: { data } } = await accountMS.put('/accounts', body, { headers })

  return data
}

export const getUserByID = async (
  id: string,
  token: string
): Promise<User> => {
  const headers = { Authorization: token ?? '' }

  const { data: { data } } = await accountMS.get(`/accounts/${id}`, { headers })

  return data
}

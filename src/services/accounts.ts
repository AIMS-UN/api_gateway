import { AuthChecker } from 'type-graphql'
import { ExpressContext } from 'apollo-server-express'
import { Session } from 'express-session'

import { User } from '@/schemas/accounts'
import { getInstance } from '@/configs/axios'

const accountMS = getInstance('account')

export const loginUser = async (username: string, password: string, session: Session): Promise<User> => {
  const body = { username, password }

  const { data: { data, token } } = await accountMS.post('/auth/login', body)

  session.token = token

  return data
}

export const registerUser = async (
  username: string,
  password: string,
  role: string,
  session: Session
): Promise<User> => {
  const body = { username, password, role }

  const { data: { data, token } } = await accountMS.post('/auth/register', body)

  session.token = token

  return data
}

export const logoutUser = async (session: Session): Promise<boolean> => {
  session.token = undefined

  return true
}

export const authChecker: AuthChecker<ExpressContext> = async ({ context: { req, res } }, roles): Promise<boolean> => {
  if (req.session.token == null) return false

  const headers = { Authorization: req.session.token }

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
  session: Session
): Promise<User> => {
  const body = { username, password, role }
  const headers = { Authorization: session.token ?? '' }

  const { data: { data } } = await accountMS.put('/accounts', body, { headers })

  return data
}

export const getUserByID = async (
  id: string,
  session: Session
): Promise<User> => {
  const headers = { Authorization: session.token ?? '' }

  const { data: { data } } = await accountMS.get(`/accounts/${id}`, { headers })

  return data
}

import { AuthChecker } from 'type-graphql'
import { ExpressContext } from 'apollo-server-express'
import { Session } from 'express-session'

import { User } from '@/schemas/accounts'
import { getInstance } from '@/configs/axios'

const accountMS = getInstance('account')

export const loginUser = async (
  username: string,
  password: string,
  session: Session
): Promise<User> => {
  const { data } = await accountMS.post('/auth/login', { username, password })

  session.token = data.token

  return await new Promise((resolve) => { resolve(data.data) })
}

export const registerUser = async (
  username: string,
  password: string,
  role: string,
  session: Session
): Promise<User> => {
  const { data } = await accountMS.post('/auth/register', {
    username,
    password,
    role
  })

  session.token = data.token

  return await new Promise((resolve) => { resolve(data.data) })
}

export const logoutUser = async (session: Session): Promise<boolean> => {
  session.token = undefined
  return await new Promise((resolve) => { resolve(true) })
}

export const authChecker: AuthChecker<ExpressContext> = async ({ context: { req, res } }) => {
  if (req.session.token == null) return false
  const { data } = await accountMS.get('/accounts', {
    headers: { Authorization: req.session.token }
  })

  res.locals.user = data.data

  return true
}

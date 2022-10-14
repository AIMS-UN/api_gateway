import { AuthChecker } from 'type-graphql'
import { ExpressContext } from 'apollo-server-express'
import { Session } from 'express-session'

import { User } from '@/schemas/accounts'
import { getInstance } from '@/configs/axios'

const accountMS = getInstance('account')

/**
 * Aquí está la función para iniciar sesión
 *
 * @param {string} username
 * @param {string} password
 * @param {Session} session
 *
 * @returns {User} user
 */

export const loginUser = async (username: string, password: string, session: Session): Promise<User> => {
  const { data } = await accountMS.post('/auth/login', { username, password })

  session.token = data.token

  return await new Promise((resolve) => {
    resolve(data.data)
  })
}

/**
 * Aquí es la función de servicio para registar a los usuarios
 *
 * @param {string} username
 * @param {string} password
 * @param {string} role
 * @param {Session} session
 *
 * @return {User} user
 */
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

  return await new Promise((resolve) => {
    resolve(data.data)
  })
}

/**
 * Esta es la función para colocar el token como nulo para cerrar la sesión.
 *
 * @param {Session} session
 *
 * @returns {boolean} true
 */
export const logoutUser = async (session: Session): Promise<boolean> => {
  session.token = undefined
  return await new Promise((resolve) => {
    resolve(true)
  })
}

/**
 * La función que revisa el token de autenticación
 *
 * @param roles
 *
 * @returns
 */
export const authChecker: AuthChecker<ExpressContext> = async ({ context: { req, res } }, roles) => {
  if (req.session.token == null) return false

  const { data } = await accountMS.get('/accounts', {
    headers: { Authorization: req.session.token }
  })

  res.locals.user = data.data

  if (roles.length === 0) {
    return true
  }

  if (roles.includes(data.data.role)) {
    return true
  }

  return false
}

/**
 * Aquí es la función para actualizar los datos de usuario
 *
 * @param {string} username
 * @param {string} password
 * @param {string} role
 *
 * @returns {User} user
 */
export const updateUser = async (
  username: string,
  password: string,
  role: string,
  session: Session
): Promise<User> => {
  const { data } = await accountMS.put('/accounts', {
    headers: {
      Authorization: session.token
    },
    data: {
      // Aquí coloco los datos a actualizar
      username,
      password,
      role
    }
  })

  return await new Promise((resolve) => {
    resolve(data.data)
  })
}

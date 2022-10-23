import axios, { AxiosInstance } from 'axios'

const panic = (message: string): never => { throw new Error(message) }

export const getInstance = (name: string): AxiosInstance => {
  const msName = `${name.toUpperCase()}_MS_BASE_URL`
  const baseURL = process.env[msName] ?? panic(`Missing ${msName} environment variable`)
  return axios.create({
    baseURL,
    headers: { 'Content-Type': 'application/json' }
  })
}

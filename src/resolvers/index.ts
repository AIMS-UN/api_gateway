import { NonEmptyArray } from 'type-graphql'
import { PingResolver } from './ping'

export const resolvers: NonEmptyArray<Function> | NonEmptyArray<string> = [
  PingResolver
]

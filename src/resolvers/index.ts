import { NonEmptyArray } from 'type-graphql'
import { PingResolver } from './ping'
import { EnrollmentResolver } from './enrollment'

export const resolvers: NonEmptyArray<Function> | NonEmptyArray<string> = [
  PingResolver,
  EnrollmentResolver
]

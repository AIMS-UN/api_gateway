import { NonEmptyArray } from 'type-graphql'
import { PingResolver } from './ping'
import { GradingResolver } from './grading'
import { SubjectResolver } from './subject'

export const resolvers: NonEmptyArray<Function> | NonEmptyArray<string> = [
  PingResolver,
  GradingResolver,
  SubjectResolver
]

import { NonEmptyArray } from 'type-graphql'
import { PingResolver } from './ping'
import { GradingResolver } from './grading'
import { ScheculeResolver } from './schedule'

export const resolvers: NonEmptyArray<Function> | NonEmptyArray<string> = [
  PingResolver,
  GradingResolver,
  ScheculeResolver
]

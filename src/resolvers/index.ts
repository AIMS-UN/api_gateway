import { NonEmptyArray } from 'type-graphql'
import { PingResolver } from './ping'
import { AccountResolver } from './accounts'
import { GradingResolver } from './grading'
import { ScheduleResolver } from './schedule'
import { SubjectResolver } from './subject'


export const resolvers: NonEmptyArray<Function> | NonEmptyArray<string> = [
  PingResolver,
  AccountResolver,
  GradingResolver,
  ScheduleResolver,
  SubjectResolver
]

import { NonEmptyArray } from 'type-graphql'
import { PingResolver } from './ping'
import { AccountResolver } from './accounts'
import { EnrollmentResolver } from './enrollment'
import { GradingResolver } from './grading'
import { ScheduleResolver } from './schedule'
import { SubjectResolver } from './subject'

export const resolvers: NonEmptyArray<Function> | NonEmptyArray<string> = [
  PingResolver,
  AccountResolver,
  EnrollmentResolver,
  GradingResolver,
  ScheduleResolver,
  SubjectResolver
]

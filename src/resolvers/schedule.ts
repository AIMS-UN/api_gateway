import { Arg, Authorized, Ctx, Query, Resolver } from 'type-graphql'

import * as scheduleService from '@/services/schedule'
import { ClassGroupResponse } from '@/schemas/subject'
import { ExpressContext } from 'apollo-server-express'
import { User } from '@/schemas/accounts'

@Resolver()
export class ScheduleResolver {
  @Authorized()
  @Query(() => [ClassGroupResponse])
  async getMySchedule (@Ctx() context: ExpressContext): Promise<ClassGroupResponse[]> {
    const { user } = context.res.locals as { user: User }
    return await scheduleService.getMySchedule(user.id)
  }

  @Authorized()
  @Query(() => [ClassGroupResponse])
  async getMyScheduleBySemester (
    @Arg('semester') semester: string,
      @Ctx() context: ExpressContext): Promise<ClassGroupResponse[]> {
    const { user } = context.res.locals as { user: User }
    return await scheduleService.getMyScheduleBySemester(user.id, semester)
  }
}

import { Arg, Query, Resolver } from 'type-graphql'
import * as scheduleService from '@/services/schedule'
import { Enrollment } from '@/schemas/enrollment'

@Resolver()
export class ScheduleResolver {
  @Query(() => [Enrollment])
  async getSchedule (@Arg('userId') userId: string): Promise<Enrollment[]> {
    const a = await scheduleService.getSchedules(userId)
    return a
  }

  @Query(() => [Enrollment])
  async getScheduleBySemester (
    @Arg('userId') userId: string,
      @Arg('semester') semester: string
  ): Promise<Enrollment[]> {
    const a = await scheduleService.getScheduleBySemester(userId, semester)
    return a
  }
}

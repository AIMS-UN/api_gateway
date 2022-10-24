import { Arg, Query, Resolver, Mutation, Authorized, Ctx } from 'type-graphql'
import { ExpressContext } from 'apollo-server-express'

import * as enrollmentService from '@/services/enrollment'
import { Enrollment } from '@/schemas/enrollment'
import { User } from '@/schemas/accounts'

@Resolver()
export class EnrollmentResolver {
  @Authorized()
  @Query(() => [Enrollment])
  async getEnrollmentsByFilters (
    @Arg('subjectId', { nullable: true }) subjectId: number,
      @Arg('groupId', { nullable: true }) groupId: string,
      @Arg('semester', { nullable: true }) semester: string,
      @Ctx() context: ExpressContext): Promise<Enrollment[]> {
    const { user } = context.res.locals as { user: User }
    return await enrollmentService.getAllEnrollmentsByFilter(user.id, subjectId, groupId, semester)
  }

  @Authorized()
  @Query(() => Enrollment)
  async getEnrollmentById (@Arg('enrollmentId') enrollmentId: string): Promise<Enrollment> {
    return await enrollmentService.getEnrollmentById(enrollmentId)
  }

  @Authorized()
  @Mutation(() => Enrollment)
  async createEnrollment (
    @Arg('groupId') groupId: string,
      @Arg('semester') semester: string,
      @Ctx() context: ExpressContext): Promise<Enrollment | undefined> {
    const { user } = context.res.locals as { user: User }
    return await enrollmentService.createEnrollment(user.id, groupId, semester)
  }

  @Authorized()
  @Mutation(() => Enrollment)
  async cancelEnrollment (
    @Arg('subjectId') subjectId: string,
      @Arg('semester') semester: string,
      @Ctx() context: ExpressContext): Promise<Enrollment> {
    const { user } = context.res.locals as { user: User }
    return await enrollmentService.cancelEnrollment(user.id, subjectId, semester)
  }
}

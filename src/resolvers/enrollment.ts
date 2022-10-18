import { Arg, Query, Resolver, Mutation, Authorized, Ctx } from 'type-graphql'
import * as enrollmentService from '@/services/enrollment'
import { Enrollment } from '@/schemas/enrollment'
import { ExpressContext } from 'apollo-server-express'
import { User } from '@/schemas/accounts'

@Resolver()
export class EnrollmentResolver {
  @Authorized()
  @Query(() => [Enrollment])
  async getEnrollmentsByFilters (
    @Arg('subject', { nullable: true }) subject: string,
      @Arg('group', { nullable: true }) group: string,
      @Arg('semester', { nullable: true }) semester: string,
      @Ctx() context: ExpressContext): Promise<Enrollment[]> {
    const { user } = context.res.locals as { user: User }
    return await enrollmentService.getAllEnrollmentsByFilter(user.id, subject, group, semester)
  }

  @Authorized()
  @Query(() => Enrollment)
  async getEnrollmentById (@Arg('id') id: string): Promise<Enrollment> {
    return await enrollmentService.getEnrollmentById(id)
  }

  @Authorized()
  @Mutation(() => Enrollment)
  async createEnrollment (
    @Arg('subject') subject: string,
      @Arg('group') group: string,
      @Arg('semester') semester: string,
      @Ctx() context: ExpressContext): Promise<Enrollment> {
    const { user } = context.res.locals as { user: User }
    return await enrollmentService.createEnrollment(user.id, subject, group, semester)
  }

  @Authorized()
  @Mutation(() => Enrollment)
  async cancelEnrollment (
    @Arg('subject') subject: string,
      @Arg('semester') semester: string,
      @Ctx() context: ExpressContext): Promise<Enrollment> {
    const { user } = context.res.locals as { user: User }
    return await enrollmentService.cancelEnrollment(user.id, subject, semester)
  }
}

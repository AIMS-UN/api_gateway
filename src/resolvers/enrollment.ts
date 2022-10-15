import { Arg, Query, Resolver, Mutation, Authorized } from 'type-graphql'
import * as enrollmentService from '@/services/enrollment'
import { Enrollment, EnrollmentInput } from '@/schemas/enrollment'

@Resolver()
export class EnrollmentResolver {
  @Authorized()
  @Query(() => [Enrollment])
  async getEnrollmentsByFilters (@Arg('input') input: EnrollmentInput): Promise<Enrollment[]> {
    return await enrollmentService.getAllEnrollmentsByFilter(input.user, input.subject, input.group, input.semester)
  }

  @Authorized()
  @Query(() => Enrollment)
  async getEnrollmentById (@Arg('id') id: number): Promise<Enrollment> {
    return await enrollmentService.getEnrollmentById(id)
  }

  @Authorized()
  @Mutation(() => Enrollment)
  async createEnrollment (@Arg('input') input: EnrollmentInput): Promise<Enrollment> {
    return await enrollmentService.createEnrollment(input)
  }

  @Authorized()
  @Mutation(() => Enrollment)
  async cancelEnrollment (@Arg('input') input: EnrollmentInput): Promise<Enrollment> {
    return await enrollmentService.cancelEnrollment(input)
  }

  @Authorized('teacher')
  @Mutation(() => Enrollment)
  async setFinalGrade (@Arg('input') input: EnrollmentInput): Promise<Enrollment> {
    return await enrollmentService.updateFinalGrade(input)
  }
}

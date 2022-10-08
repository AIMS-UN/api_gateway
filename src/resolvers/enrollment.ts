import { Arg, Query, Resolver, Mutation } from 'type-graphql'
import * as enrollmentService from '@/services/enrollment'
import { Enrollment, EnrollmentInput } from '@/schemas/enrollment'

@Resolver()
export class EnrollmentResolver {
  @Query(() => [Enrollment])
  async getEnrollments (@Arg('input') input: EnrollmentInput): Promise<Enrollment[]> {
    const userId = input.user
    const groupId = input.group
    const subjectId = input.subject
    const semester = input.semester

    if (userId != null && groupId == null && subjectId == null && semester == null) {
      return await enrollmentService.getEnrollmentsByUser(userId)
    } else if (userId == null && groupId == null && subjectId != null && semester == null) {
      return await enrollmentService.getEnrollmentsBySubject(subjectId)
    } else if (userId == null && groupId == null && subjectId == null && semester != null) {
      return await enrollmentService.getEnrollmentsBySemester(semester)
    } else if (userId != null && groupId == null && subjectId == null && semester != null) {
      return await enrollmentService.getEnrollmentsByUserAndSemester(userId, semester)
    } else if (userId == null && groupId == null && subjectId != null && semester != null) {
      return await enrollmentService.getEnrollmentsBySubjectAndSemester(subjectId, semester)
    } else if (userId == null && groupId != null && subjectId != null && semester == null) {
      return await enrollmentService.getEnrollmentsBySubjectAndGroup(subjectId, groupId)
    } else if (userId != null && groupId == null && subjectId != null && semester == null) {
      return await enrollmentService.getEnrollmentsByUserAndSubject(userId, subjectId)
    } else {
      return await enrollmentService.getAllEnrollments()
    }
  }

  @Query(() => Enrollment)
  async getById (@Arg('id') id: number): Promise<Enrollment> {
    return await enrollmentService.getEnrollment(id)
  }

  @Mutation(() => Enrollment)
  async create (@Arg('input') input: EnrollmentInput): Promise<Enrollment> {
    return await enrollmentService.createEnrollment(input)
  }

  @Mutation(() => Enrollment)
  async cancel (@Arg('input') input: EnrollmentInput): Promise<Enrollment> {
    return await enrollmentService.cancelEnrollment(input)
  }

  @Mutation(() => Enrollment)
  async setFinalGrade (@Arg('input') input: EnrollmentInput): Promise<Enrollment> {
    return await enrollmentService.updateFinalGrade(input)
  }
}

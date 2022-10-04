import { Arg, Args, ArgsType, Field, Mutation, Query, Resolver } from 'type-graphql'
import * as enrollmentService from '@/services/enrollment'
import { Enrollment } from '@/schemas/enrollment'

@ArgsType()
class GetEnrollmentsArgs {
  @Field({ nullable: true })
  userId?: string

  @Field({ nullable: true })
  groupId?: string

  @Field({ nullable: true })
  subjectId?: string

  @Field({ nullable: true })
  semester?: string
}

@Resolver()
export class EnrollmentResolver {
  // private readonly enrollmentsList: Enrollment[] = []

  @Query(() => [Enrollment])
  async getEnrollments (@Args() { userId, groupId, subjectId, semester }: GetEnrollmentsArgs): Promise<[Enrollment]> {
    if (userId != null && groupId == null && subjectId == null && semester == null) {
      return await enrollmentService.getEnrollmentsByUser(userId)
    } else if (userId == null && groupId != null && subjectId == null && semester == null) {
      return await enrollmentService.getEnrollmentsByGroup(groupId)
    } else if (userId == null && groupId == null && subjectId != null && semester == null) {
      return await enrollmentService.getEnrollmentsBySubject(subjectId)
    } else if (userId == null && groupId == null && subjectId == null && semester != null) {
      return await enrollmentService.getEnrollmentsBySemester(semester)
    } else if (userId == null && groupId == null && subjectId != null && semester != null) {
      return await enrollmentService.getEnrollmentsBySubjectAndSemester(subjectId, semester)
    } else if (userId != null && groupId == null && subjectId == null && semester != null) {
      return await enrollmentService.getEnrollmentsByUserAndSemester(userId, semester)
    }
    return await enrollmentService.getAllEnrollments()
  }

  @Query(() => Enrollment)
  async getById (@Arg('id') id: number): Promise<Enrollment> {
    return await enrollmentService.getEnrollment(id)
  }

  @Mutation(() => Enrollment)
  async create (@Arg('enrollment') enrollment: Enrollment): Promise<Enrollment> {
    return await enrollmentService.createEnrollment(enrollment)
  }

  @Mutation(() => Enrollment)
  async cancel (@Arg('user') user: string, @Arg('subject') subject: string): Promise<Enrollment> {
    return await enrollmentService.cancelEnrollment(user, subject)
  }

  @Mutation(() => Enrollment)
  async setFinalGrade (@Arg('enrollment') enrollment: Enrollment): Promise<Enrollment> {
    return await enrollmentService.updateFinalGrade(enrollment)
  }
}

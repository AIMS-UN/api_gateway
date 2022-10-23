import { ClassGroupResponse } from '@/schemas/subject'

import * as enrollmentService from '@/services/enrollment'
import * as subjectService from '@/services/subject'

export const getMySchedule = async (
  userId: string
): Promise<ClassGroupResponse[]> => {
  const enrollments = await enrollmentService.getAllEnrollmentsByFilter(userId)

  return await Promise.all(
    enrollments.map(async (enrollment) => await subjectService.getGroupById(enrollment.group))
  )
}

export const getMyScheduleBySemester = async (
  userId: string,
  semester: string
): Promise<ClassGroupResponse[]> => {
  const enrollments = await enrollmentService.getAllEnrollmentsByFilter(userId, undefined, undefined, semester)

  return await Promise.all(
    enrollments.map(async (enrollment) => await subjectService.getGroupById(enrollment.group))
  )
}

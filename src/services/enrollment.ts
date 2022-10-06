import { getInstance } from '@/configs/axios'
import { Enrollment, EnrollmentInput } from '@/schemas/enrollment'

const enrollmentMS = getInstance('enrollments')

export const getAllEnrollments = async (): Promise<Enrollment[]> => {
  const { enrollments } = await enrollmentMS.get('/enrollments')
  return await new Promise((resolve) => { resolve(enrollments) })
}

export const getEnrollmentsByUser = async (user: string): Promise<Enrollment[]> => {
  const { enrollments } = await enrollmentMS.get(`/enrollments?user=${user}`)
  return await new Promise((resolve) => { resolve(enrollments) })
}

export const getEnrollmentsByGroup = async (group: string): Promise<Enrollment[]> => {
  const { enrollments } = await enrollmentMS.get(`/enrollments?group=${group}`)
  return await new Promise((resolve) => { resolve(enrollments) })
}

export const getEnrollmentsBySubject = async (subject: string): Promise<Enrollment[]> => {
  const { enrollments } = await enrollmentMS.get(`/enrollments?subject=${subject}`)
  return await new Promise((resolve) => { resolve(enrollments) })
}

export const getEnrollmentsBySemester = async (semester: string): Promise<Enrollment[]> => {
  const { enrollments } = await enrollmentMS.get(`/enrollments?semester=${semester}`)
  return await new Promise((resolve) => { resolve(enrollments) })
}

export const getEnrollmentsBySubjectAndSemester = async (subject: string, semester: string): Promise<Enrollment[]> => {
  const { enrollments } = await enrollmentMS.get(`/enrollments?user=${subject}&semester=${semester}`)
  return await new Promise((resolve) => { resolve(enrollments) })
}

export const getEnrollmentsByUserAndSemester = async (user: string, semester: string): Promise<Enrollment[]> => {
  const { enrollments } = await enrollmentMS.get(`/enrollments?user=${user}&semester=${semester}`)
  return await new Promise((resolve) => { resolve(enrollments) })
}

export const getEnrollment = async (id: number): Promise<Enrollment> => {
  const { enrollment } = await enrollmentMS.get(`/enrollments/${id}`)
  return await new Promise((resolve) => { resolve(enrollment) })
}

export const createEnrollment = async (enrollment: EnrollmentInput): Promise<Enrollment> => {
  const { newEnrollment } = await enrollmentMS.post('/enrollments', enrollment)
  return await new Promise((resolve) => { resolve(newEnrollment) })
}

export const cancelEnrollment = async (enrollment: EnrollmentInput): Promise<Enrollment> => {
  if (enrollment.user == null || enrollment.subject == null) {
    return null as any
  }
  const { cancelledEnrollment } = await enrollmentMS.delete(`/enrollments?user=${enrollment.user}&subject=&${enrollment.subject}`)
  return await new Promise((resolve) => { resolve(cancelledEnrollment) })
}

export const updateFinalGrade = async (enrollment: EnrollmentInput): Promise<Enrollment> => {
  const { newEnrollment } = await enrollmentMS.put('/enrollments/grade', enrollment)
  return await new Promise((resolve) => { resolve(newEnrollment) })
}

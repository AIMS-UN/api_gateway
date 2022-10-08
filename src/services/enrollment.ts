import { getInstance } from '@/configs/axios'
import { Enrollment, EnrollmentInput } from '@/schemas/enrollment'

const enrollmentMS = getInstance('enrollments')

export const getAllEnrollments = async (): Promise<Enrollment[]> => {
  const { data } = await enrollmentMS.get('/enrollments/')
  console.log(JSON.stringify(data))
  return await new Promise((resolve) => { resolve(data) })
}

export const getEnrollmentsByUser = async (user: string): Promise<Enrollment[]> => {
  const { data } = await enrollmentMS.get(`/enrollments?user=${user}`)
  return await new Promise((resolve) => { resolve(data) })
}

export const getEnrollmentsBySubject = async (subject: string): Promise<Enrollment[]> => {
  const { data } = await enrollmentMS.get(`/enrollments?subject=${subject}`)
  return await new Promise((resolve) => { resolve(data) })
}

export const getEnrollmentsBySemester = async (semester: string): Promise<Enrollment[]> => {
  const { data } = await enrollmentMS.get(`/enrollments?semester=${semester}`)
  return await new Promise((resolve) => { resolve(data) })
}

export const getEnrollmentsBySubjectAndSemester = async (subject: string, semester: string): Promise<Enrollment[]> => {
  const { data } = await enrollmentMS.get(`/enrollments?subject=${subject}&semester=${semester}`)
  return await new Promise((resolve) => { resolve(data) })
}

export const getEnrollmentsByUserAndSemester = async (user: string, semester: string): Promise<Enrollment[]> => {
  const { data } = await enrollmentMS.get(`/enrollments?user=${user}&semester=${semester}`)
  return await new Promise((resolve) => { resolve(data) })
}

export const getEnrollmentsBySubjectAndGroup = async (subject: string, group: string): Promise<Enrollment[]> => {
  const { data } = await enrollmentMS.get(`/enrollments?subject=${subject}&group=${group}`)
  return await new Promise((resolve) => { resolve(data) })
}

export const getEnrollmentsByUserAndSubject = async (user: string, subject: string): Promise<Enrollment[]> => {
  const { data } = await enrollmentMS.get(`/enrollments?user=${user}&subject=${subject}`)
  return await new Promise((resolve) => { resolve(data) })
}

export const getEnrollment = async (id: number): Promise<Enrollment> => {
  const { data } = await enrollmentMS.get(`/enrollments/${id}`)
  return await new Promise((resolve) => { resolve(data) })
}

export const createEnrollment = async (enrollment: EnrollmentInput): Promise<Enrollment> => {
  const { data } = await enrollmentMS.post('/enrollments', enrollment)
  return await new Promise((resolve) => { resolve(data) })
}

export const cancelEnrollment = async (enrollment: EnrollmentInput): Promise<Enrollment> => {
  if (enrollment.user == null || enrollment.subject == null || enrollment.semester == null) {
    return null as any
  }
  const { data } = await enrollmentMS.delete(`/enrollments?user=${enrollment.user}&subject=${enrollment.subject}&semester=${enrollment.semester}`)
  return await new Promise((resolve) => { resolve(data) })
}

export const updateFinalGrade = async (enrollment: EnrollmentInput): Promise<Enrollment> => {
  const { data } = await enrollmentMS.put('/enrollments/grade', enrollment)
  return await new Promise((resolve) => { resolve(data) })
}

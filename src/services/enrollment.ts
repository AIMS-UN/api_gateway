import { getInstance } from '@/configs/axios'
import { Enrollment, EnrollmentInput } from '@/schemas/enrollment'

const enrollmentMS = getInstance('enrollments')

export const getAllEnrollmentsByFilter = async (user?: string, subject?: string, group?: string, semester?: string): Promise<Enrollment[]> => {
  let url = '/enrollments?'

  if (user != null) { url += `user=${user}&` }
  if (subject != null) { url += `subject=${subject}&` }
  if (group != null) { url += `group=${group}&` }
  if (semester != null) { url += `semester=${semester}&` }

  const { data } = await enrollmentMS.get(url)
  return await new Promise((resolve) => { resolve(data) })
}

export const getEnrollmentById = async (id: number): Promise<Enrollment> => {
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

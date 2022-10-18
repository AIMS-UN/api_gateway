import { getInstance } from '@/configs/axios'
import { Enrollment } from '@/schemas/enrollment'

const enrollmentMS = getInstance('enrollments')

export const getAllEnrollmentsByFilter = async (user?: string, subject?: string, group?: string, semester?: string): Promise<Enrollment[]> => {
  let url = '/enrollments?'

  if (user != null) { url += `user=${user}&` }
  if (subject != null) { url += `subject=${subject}&` }
  if (group != null) { url += `group=${group}&` }
  if (semester != null) { url += `semester=${semester}&` }

  console.log('getAllEnrollmentsByFilter Called')
  const { data } = await enrollmentMS.get(url)
  console.log(data)
  return await new Promise((resolve) => { resolve(data) })
}

export const getEnrollmentById = async (id: string): Promise<Enrollment> => {
  const { data } = await enrollmentMS.get(`/enrollments/${id}`)
  return await new Promise((resolve) => { resolve(data) })
}

export const createEnrollment = async (user: string, subject: string, group: string, semester: string): Promise<Enrollment> => {
  console.log('createEnrollment Called')
  const { data } = await enrollmentMS.post('/enrollments', { user, subject, group, semester, null: null })
  console.log(data)
  return await new Promise((resolve) => { resolve(data) })
}

export const cancelEnrollment = async (user: string, subject: string, semester: string): Promise<Enrollment> => {
  if (user == null || subject == null || semester == null) {
    return null as any
  }
  const { data } = await enrollmentMS.delete(`/enrollments?user=${user}&subject=${subject}&semester=${semester}`)
  return await new Promise((resolve) => { resolve(data) })
}

export const updateFinalGrade = async (user: string, subject: string, group: string, semester: string, finalGrade: number): Promise<Enrollment> => {
  const { data } = await enrollmentMS.put('/enrollments/grade', { user, subject, group, semester, finalGrade })
  return await new Promise((resolve) => { resolve(data) })
}

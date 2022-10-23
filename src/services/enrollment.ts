import { getInstance } from '@/configs/axios'
import { Enrollment } from '@/schemas/enrollment'

const enrollmentMS = getInstance('enrollments')

export const getAllEnrollmentsByFilter = async (user?: string, subject?: string, group?: string, semester?: string): Promise<Enrollment[]> => {
  let url = '/enrollments?'

  if (user != null) { url += `user=${user}&` }
  if (subject != null) { url += `subject=${subject}&` }
  if (group != null) { url += `group=${group}&` }
  if (semester != null) { url += `semester=${semester}&` }

  console.log('Calling getAllEnrollmentsByFilter with url: ' + url)

  const { data } = await enrollmentMS.get(url)

  // const params = { user, subject, group, semester }

  // const { data } = await enrollmentMS.get('/enrollments', { params })

  console.log('getAllEnrollmentsByFilter result: ' + JSON.stringify(data))

  return data
}

export const getEnrollmentById = async (id: string): Promise<Enrollment> => {
  const { data } = await enrollmentMS.get(`/enrollments/${id}`)

  return data
}

export const createEnrollment = async (
  user: string,
  subject: string,
  group: string,
  semester: string
): Promise<Enrollment> => {
  const body = { user, subject, group, semester }
  const { data } = await enrollmentMS.post('/enrollments', body)

  return data
}

export const cancelEnrollment = async (
  user: string,
  subject: string,
  semester: string
): Promise<Enrollment> => {
  const params = { user, subject, semester }

  const { data } = await enrollmentMS.delete('/enrollments', { params })

  return data
}

export const updateFinalGrade = async (
  user: string,
  subject: string,
  group: string,
  semester: string,
  finalGrade: number
): Promise<Enrollment> => {
  const body = { user, subject, group, semester, finalGrade }

  const { data } = await enrollmentMS.put('/enrollments/grade', body)

  return data
}

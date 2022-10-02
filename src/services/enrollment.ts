import { getInstance } from '@/configs/axios'
import { Enrollment } from '@/schemas/enrollment'

const enrollmentMS = getInstance('enrollment')
const enrollmentsEndPoint = '/enrollments'

export const getEnrollments = async (): Promise<[Enrollment]> => {
  const enrollments: [Enrollment] = await enrollmentMS.get(enrollmentsEndPoint)
  return await new Promise((resolve) => { resolve(enrollments) })
}

export const getEnrollment = async (id: number): Promise<Enrollment> => {
  const enrollment: Enrollment = await enrollmentMS.get(enrollmentsEndPoint + id.toString())
  return await new Promise((resolve) => { resolve(enrollment) })
}

export const createEnrollment = async (enrollment: Enrollment): Promise<Enrollment> => {
  const newEnrollment: Enrollment = await enrollmentMS.post(enrollmentsEndPoint, Enrollment)
  return await new Promise((resolve) => { resolve(newEnrollment) })
}

export const cancelEnrollment = async (): Promise<Enrollment> => {
  const enrollment: Enrollment = await enrollmentMS.delete(enrollmentsEndPoint)
  return await new Promise((resolve) => { resolve(enrollment) })
}

export const updateFinalGrade = async (enrollment: Enrollment): Promise<Enrollment> => {
  const newEnrollment: Enrollment = await enrollmentMS.put(enrollmentsEndPoint + '/grade', enrollment)
  return await new Promise((resolve) => { resolve(newEnrollment) })
}

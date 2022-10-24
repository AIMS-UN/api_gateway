import * as subjectService from '@/services/subject'
import { Enrollment } from '@/schemas/enrollment'
import { getInstance } from '@/configs/axios'

const enrollmentMS = getInstance('enrollments')

export const getAllEnrollmentsByFilter = async (
  userId?: string,
  subjectId?: number,
  groupId?: string,
  semester?: string
): Promise<Enrollment[]> => {
  const params = { user: userId, subject: subjectId, group: groupId, semester }

  if (groupId != null) {
    const group = await subjectService.getGroupById(groupId)
    if (group == null) {
      console.log('Group not found')
      return []
    }

    if (subjectId != null && subjectId !== group.subject.subjectId) {
      console.log('Subject and group do not match')
      return []
    }
  } else if (subjectId != null) {
    const subject = await subjectService.getSubjectById(subjectId)
    if (subject == null) {
      console.log('Subject not found')
      return []
    }
  }

  const { data } = await enrollmentMS.get('/enrollments', { params })

  return data
}

export const getEnrollmentById = async (enrollmentId: string): Promise<Enrollment> => {
  const { data } = await enrollmentMS.get(`/enrollments/${enrollmentId}`)

  return data
}

export const createEnrollment = async (
  userId: string,
  groupId: string,
  semester: string
): Promise<Enrollment | undefined> => {
  const group = await subjectService.getGroupById(groupId)
  if (group == null) {
    console.error('Group not found')
    return
  }

  const subjectId = group.subject.subjectId

  const body = { user: userId, subject: subjectId, group: groupId, semester }

  const { data } = await enrollmentMS.post('/enrollments', body)

  return data
}

export const cancelEnrollment = async (
  userId: string,
  subjectId: string,
  semester: string
): Promise<Enrollment> => {
  const params = { user: userId, subject: subjectId, semester }

  const { data } = await enrollmentMS.delete('/enrollments', { params })

  return data
}

export const updateFinalGrade = async (
  userId: string,
  groupId: string,
  semester: string,
  finalGrade: number
): Promise<Enrollment | undefined> => {
  const group = await subjectService.getGroupById(groupId)
  if (group == null) {
    console.error('Group not found')
    return
  }

  const subjectId = group.subject.subjectId

  const body = { user: userId, subject: subjectId, group: groupId, semester, finalGrade }

  const { data } = await enrollmentMS.put('/enrollments/grade', body)

  return data
}

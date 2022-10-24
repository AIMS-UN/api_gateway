import { ClassGroupResponse, SubjectResponse } from '@/schemas/subject'
import { getInstance } from '@/configs/axios'

const subjectMS = getInstance('subject')

export const getSubjects = async (): Promise<SubjectResponse[]> => {
  const { data } = await subjectMS.get('/subjects')

  return data
}

export const getSubjectByName = async (subjectName: string): Promise<SubjectResponse> => {
  const params = { subjectName }

  const { data } = await subjectMS.get('/subjects', { params })

  return data.length > 0 ? data[0] : null
}

export const getSubjectByCode = async (subjectCode: string): Promise<SubjectResponse> => {
  const params = { subjectCode }

  const { data } = await subjectMS.get('/subjects', { params })

  return data.length > 0 ? data[0] : null
}

export const getSubjectsByCareer = async (careerId: number): Promise<SubjectResponse[]> => {
  const params = { careerId }

  const { data } = await subjectMS.get('/subjects', { params })

  return data
}

export const getSubjectById = async (subjectId: number): Promise<SubjectResponse> => {
  const { data } = await subjectMS.get(`/subjects/${subjectId}`)

  return data
}

export const getClassGroups = async (): Promise<ClassGroupResponse[]> => {
  const { data } = await subjectMS.get('/groups')

  return data
}

export const getGroupById = async (classGroupId: string): Promise<ClassGroupResponse> => {
  const { data } = await subjectMS.get(`/groups/${classGroupId}`)

  return data
}

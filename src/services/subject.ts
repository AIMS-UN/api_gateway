import { ClassGroupResponse, SubjectResponse } from '@/schemas/subject'
import { getInstance } from '@/configs/axios'

const subjectInstance = getInstance('subject')

export const getSubjects = async (): Promise<SubjectResponse[]> => {
  const { data } = await subjectInstance.get('/subjects')

  return data
}

export const getSubjectByName = async (subjectName: string): Promise<SubjectResponse> => {
  const params = { subjectName }

  const { data } = await subjectInstance.get('/subjects', { params })

  return data.length > 0 ? data[0] : null
}

export const getSubjectByCode = async (subjectCode: string): Promise<SubjectResponse> => {
  const params = { subjectCode }

  const { data } = await subjectInstance.get('/subjects', { params })

  return data.length > 0 ? data[0] : null
}

export const getSubjectsbyCareer = async (careerId: number): Promise<SubjectResponse[]> => {
  const params = { careerId }

  const { data } = await subjectInstance.get('/subjects', { params })

  return data
}

export const getSubjectbyId = async (subjectId: number): Promise<SubjectResponse> => {
  const { data } = await subjectInstance.get(`/subjects/${subjectId}`)

  return data
}

export const getClassGroups = async (): Promise<ClassGroupResponse[]> => {
  const { data } = await subjectInstance.get('/groups')

  return data
}

export const getGroupById = async (classGroupId: string): Promise<ClassGroupResponse> => {
  const { data } = await subjectInstance.get(`/groups/${classGroupId}`)

  return data
}

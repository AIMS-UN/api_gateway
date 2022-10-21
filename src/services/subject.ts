import { getInstance } from '@/configs/axios'

import { ClassGroups, Subject } from '@/schemas/subject'

const subjectInstance = getInstance('subject')

export const getSubjectbyName = async (name: string): Promise<Subject[]> => {
  const { data } = await subjectInstance.get(`/subjects?name=${name}`)
  return await new Promise((resolve) => { resolve(data) })
}

export const getSubjectbyCode = async (code: string): Promise<Subject[]> => {
  const { data } = await subjectInstance.get(`/subjects?code=${code}`)
  return await new Promise((resolve) => { resolve(data) })
}

export const getSubjectbyCareer = async (career: number): Promise<Subject[]> => {
  const { data } = await subjectInstance.get(`/subjects?career=${career}`)
  return await new Promise((resolve) => { resolve(data) })
}
export const getGroupById = async (classGroupId: string): Promise<ClassGroups> => {
  const { data } = await subjectInstance.get(`/group/${classGroupId}`)
  return await new Promise((resolve) => { resolve(data) })
}

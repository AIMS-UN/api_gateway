import { getInstance } from '@/configs/axios'

import { Faculties, Departments, Careers } from '@/schemas/college'

const collegeInstance = getInstance('college')

export const getFacultybyName = async (name: string): Promise<Faculties[]> => {
  const { data } = await collegeInstance.get(`/college/faculties?name=${name}`)
  console.log(data)

  return await new Promise((resolve) => { resolve(data) })
}

export const getDepartmentbyName = async (name: string): Promise<Departments[]> => {
  const { data } = await collegeInstance.get(`/college/departments?name=${name}`)
  console.log(data)

  return await new Promise((resolve) => { resolve(data) })
}
export const getCareerbyName = async (name: string): Promise<Careers[]> => {
  const { data } = await collegeInstance.get(`/college/careers?name=${name}`)
  console.log(data)

  return await new Promise((resolve) => { resolve(data) })
}

export const getCareerById = async (careerId: number): Promise<Careers> => {
  const { data } = await collegeInstance.get(`/college/careers/${careerId}`)

  return await new Promise((resolve) => { resolve(data) })
}
export const getDepartmentById = async (departmentId: number): Promise<Departments> => {
  const { data } = await collegeInstance.get(`/college/departments/${departmentId}`)

  return await new Promise((resolve) => { resolve(data) })
}
export const getFacultyById = async (facultyId: number): Promise<Faculties> => {
  const { data } = await collegeInstance.get(`/college/faculties/${facultyId}`)
  console.log(data)
  return await new Promise((resolve) => { resolve(data) })
}

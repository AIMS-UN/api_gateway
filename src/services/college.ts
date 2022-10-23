import { CareerResponse, DepartmentResponse, FacultyResponse } from '@/schemas/college'
import { getInstance } from '@/configs/axios'

const collegeInstance = getInstance('college')

export const getFacultyById = async (facultyId: number): Promise<FacultyResponse> => {
  const { data } = await collegeInstance.get(`/faculties/${facultyId}`)

  return data
}

export const getFaculties = async (): Promise<FacultyResponse[]> => {
  const { data } = await collegeInstance.get('/faculties')

  return data
}

export const getDepartments = async (): Promise<DepartmentResponse[]> => {
  const { data } = await collegeInstance.get('/departments')

  return data
}

export const getDepartmentById = async (departmentId: number): Promise<DepartmentResponse> => {
  const { data } = await collegeInstance.get(`/departments/${departmentId}`)

  return data
}

export const getCareers = async (): Promise<CareerResponse[]> => {
  const { data } = await collegeInstance.get('/careers')

  return data
}

export const getCareerById = async (careerId: number): Promise<CareerResponse> => {
  const { data } = await collegeInstance.get(`/careers/${careerId}`)

  return data
}

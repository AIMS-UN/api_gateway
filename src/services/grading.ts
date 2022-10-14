import { Category, Grade, CategoryInput, GradeInput } from '@/schemas/grading'
import { getInstance } from '@/configs/axios'

const gradingInstance = getInstance('grading')

export const createCategory = async (category: CategoryInput): Promise<Category> => {
  const { data } = await gradingInstance.post('/categories', category)

  return await new Promise((resolve) => { resolve(data.data) })
}

export const createGrade = async (grade: GradeInput): Promise<Grade> => {
  const { data } = await gradingInstance.post('/grades', grade)

  return await new Promise((resolve) => { resolve(data.data) })
}

export const getCategories = async (): Promise<Category[]> => {
  const { data } = await gradingInstance.get('/categories')

  return await new Promise((resolve) => { resolve(data.data) })
}

export const getGrades = async (): Promise<Grade[]> => {
  const { data } = await gradingInstance.get('/grades')

  return await new Promise((resolve) => { resolve(data.data) })
}

export const updateCategory = async (category: CategoryInput, categoryId: string): Promise<Category> => {
  const { data } = await gradingInstance.put(`/categories/${categoryId}`, category)

  return await new Promise((resolve) => { resolve(data.data) })
}

export const updateGrade = async (grade: GradeInput, gradeId: string): Promise<Grade> => {
  const { data } = await gradingInstance.put(`/grades/${gradeId}`, grade)

  return await new Promise((resolve) => { resolve(data.data) })
}

export const deleteCategory = async (id: string): Promise<Category> => {
  const { data } = await gradingInstance.delete(`/categories/${id}`)

  return await new Promise((resolve) => { resolve(data.data) })
}

export const deleteGrade = async (id: string): Promise<Grade> => {
  const { data } = await gradingInstance.delete(`/grades/${id}`)

  return await new Promise((resolve) => { resolve(data.data) })
}

export const getGrade = async (id: string): Promise<Grade> => {
  const { data } = await gradingInstance.get(`/grades/${id}`)

  return await new Promise((resolve) => { resolve(data.data) })
}

export const getCategory = async (id: string): Promise<Category> => {
  const { data } = await gradingInstance.get(`/categories/${id}`)

  return await new Promise((resolve) => { resolve(data.data) })
}

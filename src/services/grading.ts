import { Session } from 'express-session'

import * as accountService from '@/services/accounts'
import * as subjectService from '@/services/subject'
import { Category, Grade, CategoryInput, GradeInput } from '@/schemas/grading'
import { getInstance } from '@/configs/axios'
import { publish as mqPublish } from '@/mq/publisher'

const gradingMS = getInstance('grading')

export const getCategories = async (
  { groupId, subjectCode }: { groupId?: string, subjectCode?: string } = {}
): Promise<Category[]> => {
  const params = { group_id: groupId, subject_code: subjectCode }

  const { data: { data } } = await gradingMS.get('/categories', { params })

  return data
}

export const getCategory = async (id: string): Promise<Category> => {
  const { data: { data } } = await gradingMS.get(`/categories/${id}`)

  return data
}

export const createCategory = async (category: CategoryInput): Promise<String> => {
  const { group_id: groupId } = category

  const group = await subjectService.getGroupById(groupId)
  if (group == null) {
    console.error(`Group with id ${groupId} does not exist`)

    return 'Group does not exist'
  }

  const { subjectCode } = group.subject

  const message = { ...category, subject_code: subjectCode }
  await mqPublish('category.create', message)
  return 'Category created'
}

export const updateCategory = async (
  categoryId: string,
  category: CategoryInput
): Promise<String> => {
  const { group_id: groupId } = category

  const group = await subjectService.getGroupById(groupId)
  if (group == null) {
    console.error(`Group with id ${groupId} does not exist`)
    return 'Group does not exist'
  }

  const { subjectCode } = group.subject

  const categoryCheck = await getCategory(categoryId)

  if (categoryCheck == null) {
    console.error(`Category with id ${categoryId} does not exist`)
    return 'Category does not exist'
  }

  const message = { id: categoryId, ...category, subject_code: subjectCode }
  await mqPublish('category.update', message)
  return 'Category updated'
}

export const deleteCategory = async (id: string): Promise<String> => {
  const category = await getCategory(id)

  if (category == null) {
    console.error(`Category with id ${id} does not exist`)
    return 'Category does not exist'
  }

  const message = { id }
  await mqPublish('category.delete', message)
  return 'Category deleted'
}

export const getGrades = async (
  { categoryId, studentId }: { categoryId?: string, studentId?: string } = {}
): Promise<Grade[]> => {
  const params = { category_id: categoryId, student_id: studentId }

  const { data: { data } } = await gradingMS.get('/grades', { params })

  return data
}

export const getGrade = async (id: string): Promise<Grade> => {
  const { data: { data } } = await gradingMS.get(`/grades/${id}`)

  return data
}

export const createGrade = async (grade: GradeInput, session: Session): Promise<String> => {
  const { category_id: categoryId, student_id: studentId } = grade

  const category = await getCategory(categoryId)
  if (category == null) {
    console.error(`Category with id ${categoryId} does not exist`)
    return 'Category does not exist'
  }

  const student = await accountService.getUserByID(studentId, session)
  if (student == null) {
    console.error(`Student with id ${studentId} does not exist`)
    return 'Student does not exist'
  }

  const message = { ...grade }
  await mqPublish('grade.create', message)
  return 'Grade created'
}

export const updateGrade = async (
  gradeId: string,
  grade: GradeInput,
  session: Session
): Promise<String> => {
  const { category_id: categoryId, student_id: studentId } = grade

  const category = await getCategory(categoryId)
  if (category == null) {
    console.error(`Category with id ${categoryId} does not exist`)
    return 'Category does not exist'
  }

  const student = await accountService.getUserByID(studentId, session)
  if (student == null) {
    console.error(`Student with id ${studentId} does not exist`)
    return 'Student does not exist'
  }

  const gradeCheck = await getGrade(gradeId)
  if (gradeCheck == null) {
    console.error(`Grade with id ${gradeId} does not exist`)
    return 'Grade does not exist'
  }

  const message = { id: gradeId, ...grade }
  await mqPublish('grade.update', message)
  return 'Grade updated'
}

export const deleteGrade = async (id: string): Promise<String> => {
  const grade = await getGrade(id)

  if (grade == null) {
    console.error(`Grade with id ${id} does not exist`)
    return 'Grade does not exist'
  }

  const message = { id }
  await mqPublish('grade.delete', message)
  return 'Grade deleted'
}

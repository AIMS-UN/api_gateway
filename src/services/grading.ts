import { Session } from 'express-session'

import * as accountService from '@/services/accounts'
import * as subjectService from '@/services/subject'
import { Category, Grade, CategoryInput, GradeInput } from '@/schemas/grading'
import { getInstance } from '@/configs/axios'
import { publish as mqPublish } from '@/mq/publisher'

const gradingInstance = getInstance('grading')

export const getCategories = async (
  { groupId, subjectCode }: { groupId?: string, subjectCode?: string } = {}
): Promise<Category[]> => {
  let url = '/categories?'

  if (groupId != null) { url += `group_id=${groupId}&` }
  if (subjectCode != null) { url += `subject_code=${subjectCode}&` }

  const { data } = await gradingInstance.get(url)

  return await new Promise((resolve) => { resolve(data.data) })
}

export const getCategory = async (id: string): Promise<Category> => {
  const { data } = await gradingInstance.get(`/categories/${id}`)

  return await new Promise((resolve) => { resolve(data.data) })
}

export const createCategory = async (category: CategoryInput): Promise<String> => {
  const { group_id: groupId, subject_code: subjectCode } = category

  const group = await subjectService.getGroupById(groupId)
  if (group == null) {
    console.error(`Group with id ${groupId} does not exist`)
    return 'Group does not exist'
  }

  // TODO: fix parse int
  const subject = await subjectService.getSubjectbyCode(parseInt(subjectCode))
  if (subject == null) {
    console.error(`Subject with code ${subjectCode} does not exist`)
    return 'Subject does not exist'
  }

  await mqPublish('category.create', category)
  return await new Promise((resolve) => { resolve('Category update sent to queue') })
}

export const updateCategory = async (
  categoryId: string,
  category: CategoryInput
): Promise<String> => {
  const { group_id: groupId, subject_code: subjectCode } = category

  const group = await subjectService.getGroupById(groupId)
  if (group == null) {
    console.error(`Group with id ${groupId} does not exist`)
    return 'Group does not exist'
  }

  // TODO: fix parse int
  const subject = await subjectService.getSubjectbyCode(parseInt(subjectCode))
  if (subject == null) {
    console.error(`Subject with code ${subjectCode} does not exist`)
    return 'Subject does not exist'
  }

  const categoryCheck = await getCategory(categoryId)
  if (categoryCheck == null) {
    console.error(`Category with id ${categoryId} does not exist`)
    return 'Category does not exist'
  }

  await mqPublish('category.update', { id: categoryId, ...category })
  return await new Promise((resolve) => { resolve('Category update sent to queue') })
}

export const deleteCategory = async (id: string): Promise<String> => {
  const category = await getCategory(id)
  if (category == null) {
    console.error(`Category with id ${id} does not exist`)
    return 'Category does not exist'
  }

  await mqPublish('category.delete', id)
  return await new Promise((resolve) => { resolve('Category deletion sent to queue') })
}

export const getGrades = async (
  { categoryId, studentId }: { categoryId?: string, studentId?: string } = {}
): Promise<Grade[]> => {
  let url = '/grades?'

  if (categoryId != null) { url += `category_id=${categoryId}&` }
  if (studentId != null) { url += `student_id=${studentId}&` }

  const { data } = await gradingInstance.get(url)

  return await new Promise((resolve) => { resolve(data.data) })
}

export const getGrade = async (id: string): Promise<Grade> => {
  const { data } = await gradingInstance.get(`/grades/${id}`)

  return await new Promise((resolve) => { resolve(data.data) })
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

  await mqPublish('grade.create', grade)
  return await new Promise((resolve) => { resolve('Grade creation sent to queue') })
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

  await mqPublish('grade.update', { id: gradeId, ...grade })
  return await new Promise((resolve) => { resolve('Grade update sent to queue') })
}

export const deleteGrade = async (id: string): Promise<String> => {
  const grade = await getGrade(id)
  if (grade == null) {
    console.error(`Grade with id ${id} does not exist`)
    return 'Grade does not exist'
  }

  await mqPublish('grade.delete', id)
  return await new Promise((resolve) => { resolve('Grade deletion sent to queue') })
}

import { Category, Grade } from '@/schemas/grading'
import * as gradingService from '@/services/grading'
import { Arg, Mutation, Query, Resolver } from 'type-graphql'

@Resolver()
export class GradingResolver {
  @Query(() => [Category])
  async getCategories (): Promise<Category[]> {
    const a = await gradingService.getCategories()
    console.log(a)
    return a
  }

  @Query(() => Category)
  async getCategoriesById (@Arg('id') id: string): Promise<Category> {
    return await gradingService.getCategoryById(id)
  }

  @Mutation(() => Category)
  async createCategory (
    @Arg('name') name: string,
      @Arg('weight') weight: number,
      @Arg('group_id') groupId: string,
      @Arg('subject_id') subjectId: string): Promise<Category> {
    return await gradingService.createCategory({ name, weight, group_id: groupId, subject_id: subjectId })
  }

  @Mutation(() => Category)
  async updateCategory (
    @Arg('id') id: string,
      @Arg('name') name: string,
      @Arg('weight') weight: number,
      @Arg('groupId') groupId: string,
      @Arg('subject_id') subjectId: string): Promise<Category> {
    return await gradingService.updateCategory({ name, weight, group_id: groupId, subject_id: subjectId }, id)
  }

  @Mutation(() => Category)
  async deleteCategory (@Arg('id') id: string): Promise<Category> {
    return await gradingService.deleteCategory(id)
  }

  @Query(() => [Grade])
  async getGrades (): Promise<Grade[]> {
    return await gradingService.getGrades()
  }

  @Query(() => Grade)
  async getGradeById (@Arg('id') id: string): Promise<Grade> {
    return await gradingService.getGradeById(id)
  }

  @Mutation(() => Grade)
  async createGrade (
    @Arg('score') score: number,
      @Arg('category_id') categoryId: string,
      @Arg('student_id') studentId: string): Promise<Grade> {
    return await gradingService.createGrade({ score, category_id: categoryId, student_id: studentId })
  }

  @Mutation(() => Grade)
  async updateGrade (
    @Arg('id') id: string,
      @Arg('score') score: number,
      @Arg('category_id') categoryId: string,
      @Arg('student_id') studentId: string): Promise<Grade> {
    return await gradingService.updateGrade({ score, category_id: categoryId, student_id: studentId }, id)
  }

  @Mutation(() => Grade)
  async deleteGrade (@Arg('id') id: string): Promise<Grade> {
    return await gradingService.deleteGrade(id)
  }
}

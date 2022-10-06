import { Category, Grade } from '@/schemas/grading'
import * as gradingService from '@/services/grading'
import { Arg, Mutation, Query, Resolver } from 'type-graphql'
import { publish as mqPublish } from '@/mq/publisher'

@Resolver()
export class GradingResolver {
  @Query(() => [Category])
  async getGradingCategories (): Promise<Category[]> {
    const a = await gradingService.getCategories()
    console.log(a)
    return a
  }

  @Query(() => Category)
  async getGradingCategory (@Arg('id') id: string): Promise<Category> {
    return await gradingService.getCategoryById(id)
  }

  @Mutation(() => String)
  async createGradingCategory (
    @Arg('name') name: string,
      @Arg('weight') weight: number,
      @Arg('group_id') groupId: string,
      @Arg('subject_id') subjectId: string): Promise<String> {
    await mqPublish('category.create', { name, weight, group_id: groupId, subject_id: subjectId })
    return 'Category creation sent to queue'
  }

  @Mutation(() => String)
  async updateGradingCategory (
    @Arg('id') id: string,
      @Arg('name') name: string,
      @Arg('weight') weight: number,
      @Arg('groupId') groupId: string,
      @Arg('subject_id') subjectId: string): Promise<String> {
    await mqPublish('category.update', { id, name, weight, group_id: groupId, subject_id: subjectId })
    return 'Category update sent to queue'
  }

  @Mutation(() => String)
  async deleteGradingCategory (@Arg('id') id: string): Promise<String> {
    await mqPublish('category.delete', { id })
    return 'Category deletion sent to queue'
  }

  @Query(() => [Grade])
  async getGrades (): Promise<Grade[]> {
    return await gradingService.getGrades()
  }

  @Query(() => Grade)
  async getGradeById (@Arg('id') id: string): Promise<Grade> {
    return await gradingService.getGradeById(id)
  }

  @Mutation(() => String)
  async createGrade (
    @Arg('score') score: number,
      @Arg('category_id') categoryId: string,
      @Arg('student_id') studentId: string): Promise<String> {
    await mqPublish('grade.create', { score, category_id: categoryId, student_id: studentId })
    return 'Grade creation sent to queue'
  }

  @Mutation(() => String)
  async updateGrade (
    @Arg('id') id: string,
      @Arg('score') score: number,
      @Arg('category_id') categoryId: string,
      @Arg('student_id') studentId: string): Promise<String> {
    await mqPublish('grade.update', { id, score, category_id: categoryId, student_id: studentId })
    return 'Grade update sent to queue'
  }

  @Mutation(() => String)
  async deleteGrade (@Arg('id') id: string): Promise<String> {
    await mqPublish('grade.delete', { id })
    return 'Grade deletion sent to queue'
  }
}

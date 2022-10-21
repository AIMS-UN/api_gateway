import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql'
import { ExpressContext } from 'apollo-server-express'

import * as gradingService from '@/services/grading'
import { Category, CategoryInput, Grade, GradeInput } from '@/schemas/grading'

@Resolver()
export class GradingResolver {
  @Query(() => [Category])
  async getGradingCategories (
    @Arg('group_id', { nullable: true }) groupId?: string,
      @Arg('subject_code', { nullable: true }) subjectCode?: string
  ): Promise<Category[]> {
    return await gradingService.getCategories({ groupId, subjectCode })
  }

  @Query(() => Category)
  async getGradingCategory (@Arg('id') id: string): Promise<Category> {
    return await gradingService.getCategory(id)
  }

  @Authorized('teacher')
  @Mutation(() => String)
  async createGradingCategory (
    @Arg('category_input') categoryInput: CategoryInput
  ): Promise<String> {
    return await gradingService.createCategory(categoryInput)
  }

  @Authorized('teacher')
  @Mutation(() => String)
  async updateGradingCategory (
    @Arg('id') id: string,
      @Arg('category_input') categoryInput: CategoryInput
  ): Promise<String> {
    return await gradingService.updateCategory(id, categoryInput)
  }

  @Authorized('teacher')
  @Mutation(() => String)
  async deleteGradingCategory (@Arg('id') id: string): Promise<String> {
    return await gradingService.deleteCategory(id)
  }

  @Query(() => [Grade])
  async getGrades (
    @Arg('category_id', { nullable: true }) categoryId?: string,
      @Arg('student_id', { nullable: true }) studentId?: string
  ): Promise<Grade[]> {
    return await gradingService.getGrades({ categoryId, studentId })
  }

  @Query(() => Grade)
  async getGrade (@Arg('id') id: string): Promise<Grade> {
    return await gradingService.getGrade(id)
  }

  @Authorized('teacher')
  @Mutation(() => String)
  async createGrade (
    @Arg('grade_input') gradeInput: GradeInput,
      @Ctx() context: ExpressContext
  ): Promise<String> {
    const session = context.req.session
    return await gradingService.createGrade(gradeInput, session)
  }

  @Authorized('teacher')
  @Mutation(() => String)
  async updateGrade (
    @Arg('id') id: string,
      @Arg('grade_input') gradeInput: GradeInput,
      @Ctx() context: ExpressContext
  ): Promise<String> {
    const session = context.req.session
    return await gradingService.updateGrade(id, gradeInput, session)
  }

  @Authorized('teacher')
  @Mutation(() => String)
  async deleteGrade (@Arg('id') id: string): Promise<String> {
    return await gradingService.deleteGrade(id)
  }
}

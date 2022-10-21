import { Category, CategoryInput, Grade, GradeInput } from '@/schemas/grading'
import * as gradingService from '@/services/grading'
import { Arg, Authorized, Mutation, Query, Resolver } from 'type-graphql'
import { publish as mqPublish } from '@/mq/publisher'

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
  async createGradingCategory (@Arg('category_input') categoryInput: CategoryInput): Promise<String> {
    await mqPublish('category.create', categoryInput)
    return 'Category creation sent to queue'
  }

  @Authorized('teacher')
  @Mutation(() => String)
  async updateGradingCategory (@Arg('id') id: string, @Arg('category_input') categoryInput: CategoryInput): Promise<String> {
    await mqPublish('category.update', { id, ...categoryInput })
    return 'Category update sent to queue'
  }

  @Authorized('teacher')
  @Mutation(() => String)
  async deleteGradingCategory (@Arg('id') id: string): Promise<String> {
    await mqPublish('category.delete', { id })
    return 'Category deletion sent to queue'
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
  async createGrade (@Arg('grade_input') gradeInput: GradeInput): Promise<String> {
    await mqPublish('grade.create', gradeInput)
    return 'Grade creation sent to queue'
  }

  @Authorized('teacher')
  @Mutation(() => String)
  async updateGrade (@Arg('id') id: string, @Arg('grade_input') gradeInput: GradeInput): Promise<String> {
    await mqPublish('grade.update', { id, ...gradeInput })
    return 'Grade update sent to queue'
  }

  @Authorized('teacher')
  @Mutation(() => String)
  async deleteGrade (@Arg('id') id: string): Promise<String> {
    await mqPublish('grade.delete', { id })
    return 'Grade deletion sent to queue'
  }
}

import { Category, CategoryInput, Grade, GradeInput } from '@/schemas/grading'
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
    return await gradingService.getCategory(id)
  }

  @Mutation(() => String)
  async createGradingCategory (@Arg('category_input') categoryInput: CategoryInput): Promise<String> {
    await mqPublish('category.create', categoryInput)
    return 'Category creation sent to queue'
  }

  @Mutation(() => String)
  async updateGradingCategory (@Arg('id') id: string, @Arg('category_input') categoryInput: CategoryInput): Promise<String> {
    await mqPublish('category.update', { id, ...categoryInput })
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
  async getGrade (@Arg('id') id: string): Promise<Grade> {
    return await gradingService.getGrade(id)
  }

  @Mutation(() => String)
  async createGrade (@Arg('grade_input') gradeInput: GradeInput): Promise<String> {
    await mqPublish('grade.create', gradeInput)
    return 'Grade creation sent to queue'
  }

  @Mutation(() => String)
  async updateGrade (@Arg('id') id: string, @Arg('grade_input') gradeInput: GradeInput): Promise<String> {
    await mqPublish('grade.update', { id, ...gradeInput })
    return 'Grade update sent to queue'
  }

  @Mutation(() => String)
  async deleteGrade (@Arg('id') id: string): Promise<String> {
    await mqPublish('grade.delete', { id })
    return 'Grade deletion sent to queue'
  }
}

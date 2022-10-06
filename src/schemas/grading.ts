import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export class Category {
  @Field()
  id!: string

  @Field()
  name!: string

  @Field()
  weight!: number

  @Field()
  group_id!: string

  @Field()
  subject_id!: string
}

@ObjectType()
export class CategoryInput {
  @Field()
  name!: string

  @Field()
  weight!: number

  @Field()
  group_id!: string

  @Field()
  subject_id!: string
}

@ObjectType()
export class Grade {
  @Field()
  id!: string

  @Field()
  category_id!: string

  @Field()
  student_id!: string

  @Field()
  score!: number
}

@ObjectType()
export class GradeInput {
  @Field()
  category_id!: string

  @Field()
  student_id!: string

  @Field()
  score!: number
}

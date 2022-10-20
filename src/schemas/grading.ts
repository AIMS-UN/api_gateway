import { Field, InputType, ObjectType } from 'type-graphql'

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
  subject_code!: string
}

@InputType()
export class CategoryInput {
  @Field()
  name!: string

  @Field()
  weight!: number

  @Field()
  group_id!: string

  @Field()
  subject_code!: string
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

@InputType()
export class GradeInput {
  @Field()
  category_id!: string

  @Field()
  student_id!: string

  @Field()
  score!: number
}

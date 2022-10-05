import { Field, ObjectType, InputType } from 'type-graphql'

@ObjectType()
export class Enrollment {
  @Field()
  id!: number

  @Field()
  user!: string

  @Field()
  group!: string

  @Field()
  subject!: string

  @Field()
  semester!: string

  @Field({ nullable: true })
  finalGrade?: number
}

@InputType()
export class EnrollmentInput {
  @Field({ nullable: true })
  user?: string

  @Field({ nullable: true })
  group?: string

  @Field({ nullable: true })
  subject?: string

  @Field({ nullable: true })
  semester?: string

  @Field({ nullable: true })
  finalGrade?: number
}

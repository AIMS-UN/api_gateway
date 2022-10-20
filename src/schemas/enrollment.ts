import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export class Enrollment {
  @Field()
  id!: string

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

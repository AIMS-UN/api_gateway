import { ID, Field, ObjectType } from 'type-graphql'

@ObjectType()
export class Enrollment {
  @Field(type => ID)
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

import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export class Enrollment {
  @Field()
  enrolment_id!: number

  @Field()
  user_id!: string

  @Field()
  group_id!: number

  @Field()
  subject_id!: number

  @Field()
  semester!: string

  @Field({ nullable: true })
  final_grade?: number
}

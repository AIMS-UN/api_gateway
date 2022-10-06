import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export class Subject {
  @Field()
  subject_id!: number

  @Field()
  name!: string

  @Field({ nullable: true })
  curriculum?: string

  @Field()
  credits?: number

  @Field()
  code?: Number

  @Field()
  career?: Number
}

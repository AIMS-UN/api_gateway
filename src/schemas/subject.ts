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
  code?: number

  @Field()
  career?: number
}

@ObjectType()
export class ClassGroups {
  @Field()
  classGroupId!: string

  @Field()
  max_capacity!: number

  @Field()
  teacher_id !: number
}

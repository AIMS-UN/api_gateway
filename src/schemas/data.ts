import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export class Data {
  @Field()
  name!: string

  @Field({ nullable: true })
  message?: string
}

import { ID, Field, ObjectType } from 'type-graphql'

@ObjectType()
export class User {
  @Field(_type => ID)
  id!: string

  @Field()
  username!: string

  @Field()
  role!: string

  @Field({ nullable: true })
  updatedAt?: string

  @Field({ nullable: true })
  createdAt?: string
}

@ObjectType()
export class Login {
  @Field()
  token!: string

  @Field()
  user!: User
}

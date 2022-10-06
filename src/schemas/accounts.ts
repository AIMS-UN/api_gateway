import { ID, Field, ObjectType } from 'type-graphql'

@ObjectType()
export class User {
  @Field(_type => ID)
  id!: number

  @Field()
  username!: string

  @Field()
  password!: string

  @Field()
  role!: string

  @Field({ nullable: true })
  updatedAt?: string

  @Field({ nullable: true })
  createdAt?: string
}

@ObjectType()
export class Session {
  @Field()
  token!: string

  @Field()
  user!: User
}

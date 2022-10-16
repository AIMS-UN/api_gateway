// Importamos cositas del GraphQL
import { ID, Field, ObjectType } from 'type-graphql'

// Hacemos el objeto de Usuario
// Tiene las variables que queremos de los request
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

import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export class Historials {
  @Field()
  coursed_credits!: number

  @Field()
  approved_credits!: number

  @Field()
  reprobed_credits!: number

  @Field()
  GPA!: number

  @Field()
  enrollment_id!: number

  @Field()
  career!: number
}

@ObjectType()
export class Profile {
  @Field()
  user_id!: string

  @Field()
  name!: string

  @Field()
  lastname!: string

  @Field()
  email!: string

  @Field()
  birthdate!: string

  @Field()
  phone_number!: string

  @Field()
  address!: string

  @Field(type => [Historials])
  historials!: Historials[ ]
}

import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export class Faculties {
  @Field()
  facultyId!: number

  @Field()
  name!: string
}
@ObjectType()
export class Departments {
  @Field()
  departmentId!: number

  @Field()
  name!: string

  @Field()
  faculties!: Faculties
}
@ObjectType()
export class Careers {
  @Field()
  careerId!: number

  @Field()
  name !: string

  @Field()
  credits !: string

  @Field()
  departments !: Departments
}

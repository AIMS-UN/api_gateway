import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export class Career {
  @Field()
  careerId!: number

  @Field()
  careerName !: string

  @Field()
  credits !: string
}

@ObjectType()
export class Department {
  @Field()
  departmentId!: number

  @Field()
  departmentName!: string
}

@ObjectType()
export class Faculty {
  @Field()
  facultyId!: number

  @Field()
  facultyName!: string
}

@ObjectType()
export class Department_Faculty extends Department {
  @Field(() => Faculty)
  faculty!: Faculty
}

@ObjectType()
export class Department_Career extends Department {
  @Field(() => [Career])
  careers!: Career[]
}

@ObjectType()
export class CareerResponse extends Career {
  @Field(() => Department_Faculty)
  department!: Department_Faculty
}

@ObjectType()
export class DepartmentResponse extends Department_Faculty {
  @Field(() => [Career])
  careers!: Career[]

  @Field(() => Faculty)
  faculty!: Faculty
}

@ObjectType()
export class FacultyResponse extends Faculty {
  @Field(() => [Department_Career])
  departments!: Department_Career[]
}

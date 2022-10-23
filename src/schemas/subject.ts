import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export class Schedule {
  @Field()
  scheduleId!: number

  @Field()
  day!: number

  @Field()
  startTime!: string

  @Field()
  endTime!: string

  @Field()
  classroom!: number

  @Field()
  building!: number
}

@ObjectType()
export class ClassGroup {
  @Field()
  groupId!: string

  @Field()
  maxCapacity!: number

  @Field()
  teacherId!: string

  @Field(() => [Schedule])
  schedules!: Schedule[]
}

@ObjectType()
export class Subject {
  @Field()
  subjectId!: number

  @Field()
  subjectName!: string

  @Field()
  subjectCode!: string

  @Field()
  careerId!: number

  @Field({ nullable: true })
  curriculum?: string

  @Field()
  credits!: number
}

@ObjectType()
export class ClassGroupResponse {
  @Field()
  groupId!: string

  @Field()
  maxCapacity!: number

  @Field()
  teacherId!: string

  @Field()
  subject!: Subject

  @Field(() => [Schedule])
  schedules!: Schedule[]
}

@ObjectType()
export class SubjectResponse {
  @Field()
  subjectId!: number

  @Field()
  subjectName!: string

  @Field()
  subjectCode!: string

  @Field()
  careerId!: number

  @Field({ nullable: true })
  curriculum?: string

  @Field()
  credits!: number

  @Field(() => [ClassGroup])
  groups!: ClassGroup[]
}

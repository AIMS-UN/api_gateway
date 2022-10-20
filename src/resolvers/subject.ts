import { ClassGroups, Subject } from '@/schemas/subject'
import * as subjectService from '@/services/subject'
import { Arg, Query, Resolver } from 'type-graphql'

@Resolver()
export class SubjectResolver {
  @Query(() => [Subject])
  async getSubjectbyName (@Arg('name') name: string): Promise<Subject[]> {
    return await subjectService.getSubjectbyName(name)
  }

  @Query(() => [Subject])
  async getSubjectbyCode (@Arg('code') code: number): Promise<Subject[]> {
    return await subjectService.getSubjectbyCode(code)
  }

  @Query(() => [Subject])
  async getSubjectbyCareer (@Arg('career') career: number): Promise<Subject[]> {
    return await subjectService.getSubjectbyCareer(career)
  }

  @Query(() => ClassGroups)
  async getGroupById (@Arg('classGroupId') classGroupId: string): Promise<ClassGroups> {
    return await subjectService.getGroupById(classGroupId)
  }
}

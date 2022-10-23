import { Arg, Query, Resolver } from 'type-graphql'

import * as subjectService from '@/services/subject'
import { ClassGroup, Subject } from '@/schemas/subject'

@Resolver()
export class SubjectResolver {
  @Query(() => [Subject])
  async getSubjects (): Promise<Subject[]> {
    return await subjectService.getSubjects()
  }

  @Query(() => Subject)
  async getSubjectByName (@Arg('subjectName') subjectName: string): Promise<Subject> {
    return await subjectService.getSubjectByName(subjectName)
  }

  @Query(() => Subject)
  async getSubjectByCode (@Arg('subjectCode') subjectCode: string): Promise<Subject> {
    return await subjectService.getSubjectByCode(subjectCode)
  }

  @Query(() => [Subject])
  async getSubjectbyCareer (@Arg('careerId') careerId: number): Promise<Subject[]> {
    return await subjectService.getSubjectsbyCareer(careerId)
  }

  @Query(() => Subject)
  async getSubjectbyId (@Arg('subjectId') subjectId: number): Promise<Subject> {
    return await subjectService.getSubjectbyId(subjectId)
  }

  @Query(() => [ClassGroup])
  async getClassGroups (): Promise<ClassGroup[]> {
    return await subjectService.getClassGroups()
  }

  @Query(() => ClassGroup)
  async getGroupById (@Arg('classGroupId') classGroupId: string): Promise<ClassGroup> {
    return await subjectService.getGroupById(classGroupId)
  }
}

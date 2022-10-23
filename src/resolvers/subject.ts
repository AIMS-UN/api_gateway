import { Arg, Query, Resolver } from 'type-graphql'

import * as subjectService from '@/services/subject'
import { ClassGroupResponse, SubjectResponse } from '@/schemas/subject'

@Resolver()
export class SubjectResolver {
  @Query(() => [SubjectResponse])
  async getSubjects (): Promise<SubjectResponse[]> {
    return await subjectService.getSubjects()
  }

  @Query(() => SubjectResponse)
  async getSubjectByName (@Arg('subjectName') subjectName: string): Promise<SubjectResponse> {
    return await subjectService.getSubjectByName(subjectName)
  }

  @Query(() => SubjectResponse)
  async getSubjectByCode (@Arg('subjectCode') subjectCode: string): Promise<SubjectResponse> {
    return await subjectService.getSubjectByCode(subjectCode)
  }

  @Query(() => [SubjectResponse])
  async getSubjectByCareer (@Arg('careerId') careerId: number): Promise<SubjectResponse[]> {
    return await subjectService.getSubjectsByCareer(careerId)
  }

  @Query(() => SubjectResponse)
  async getSubjectById (@Arg('subjectId') subjectId: number): Promise<SubjectResponse> {
    return await subjectService.getSubjectById(subjectId)
  }

  @Query(() => [ClassGroupResponse])
  async getClassGroups (): Promise<ClassGroupResponse[]> {
    return await subjectService.getClassGroups()
  }

  @Query(() => ClassGroupResponse)
  async getGroupById (@Arg('classGroupId') classGroupId: string): Promise<ClassGroupResponse> {
    return await subjectService.getGroupById(classGroupId)
  }
}

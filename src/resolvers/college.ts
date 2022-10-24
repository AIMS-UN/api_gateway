import { Arg, Query, Resolver } from 'type-graphql'

import * as collegeService from '@/services/college'
import { CareerResponse, DepartmentResponse, FacultyResponse } from '@/schemas/college'

@Resolver()
export class CollegeResolver {
  @Query(() => [CareerResponse])
  async getCareers (): Promise<CareerResponse[]> {
    return await collegeService.getCareers()
  }

  @Query(() => CareerResponse)
  async getCareerById (@Arg('careerId') careerId: number): Promise<CareerResponse> {
    return await collegeService.getCareerById(careerId)
  }

  @Query(() => [DepartmentResponse])
  async getDepartments (): Promise<DepartmentResponse[]> {
    return await collegeService.getDepartments()
  }

  @Query(() => DepartmentResponse)
  async getDepartmentById (@Arg('departmentId') departmentId: number): Promise<DepartmentResponse> {
    return await collegeService.getDepartmentById(departmentId)
  }

  @Query(() => [FacultyResponse])
  async getFaculties (): Promise<FacultyResponse[]> {
    return await collegeService.getFaculties()
  }

  @Query(() => FacultyResponse)
  async getFacultyById (@Arg('facultyId') facultyId: number): Promise<FacultyResponse> {
    return await collegeService.getFacultyById(facultyId)
  }
}

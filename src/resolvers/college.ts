import { Faculties, Departments, Careers } from '@/schemas/college'
import * as collegeService from '@/services/college'
import { Arg, Query, Resolver } from 'type-graphql'

@Resolver()
export class CollegeResolver {
  @Query(() => [Faculties])
  async getFacultybyName (@Arg('name') name: string): Promise<Faculties[]> {
    const a = await collegeService.getFacultybyName(name)
    console.log(a)
    return a
  }

  @Query(() => [Departments])
  async getDepartmentbyName (@Arg('name') name: string): Promise<Departments[]> {
    const a = await collegeService.getDepartmentbyName(name)
    console.log(a)
    return a
  }

  @Query(() => [Careers])
  async getCareerbyName (@Arg('name') name: string): Promise<Careers[]> {
    return await collegeService.getCareerbyName(name)
  }

  @Query(() => Careers)
  async getCareerById (@Arg('careerId') careerId: number): Promise<Careers> {
    return await collegeService.getCareerById(careerId)
  }

  @Query(() => Departments)
  async getDepartmentById (@Arg('departmentId') departmentId: number): Promise<Departments> {
    return await collegeService.getDepartmentById(departmentId)
  }

  @Query(() => Faculties)
  async getFacultyById (@Arg('facultyId') facultyId: number): Promise<Faculties> {
    return await collegeService.getFacultyById(facultyId)
  }
}

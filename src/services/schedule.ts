import { getInstance } from '@/configs/axios'
import { Enrollment } from '@/schemas/enrollment'
const ScheduleInstance = getInstance('schedule')

export const getSchedules = async (userId: string): Promise<Enrollment[]> => {
  const { data } = await ScheduleInstance.get(`/schedule/${userId}`)
  const result = data.data.map((enrollment: any) => {
    return {
      finalGrade: enrollment.final_grade,
      group: enrollment.group_id,
      id: enrollment.enrollment_id,
      semester: enrollment.semester,
      subject: enrollment.subject_id,
      user: enrollment.user_id
    }
  })
  return await new Promise((resolve) => resolve(result))
}

export const getScheduleBySemester = async (
  userId: string,
  semester: string
): Promise<Enrollment[]> => {
  const { data } = await ScheduleInstance.get(
    `/schedule/${userId}/${semester}`
  )
  const result = data.data.map((enrollment: any) => {
    return {
      finalGrade: enrollment.final_grade,
      group: enrollment.group_id,
      id: enrollment.enrollment_id,
      semester: enrollment.semester,
      subject: enrollment.subject_id,
      user: enrollment.user_id
    }
  })

  return await new Promise((resolve) => resolve(result))
}

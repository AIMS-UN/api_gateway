import { getInstance } from '@/configs/axios'
import { Enrollment } from '@/schemas/enrollment'
const ScheduleInstance = getInstance('schedule')

export const getSchedules = async (userId: string): Promise<Enrollment[]> => {
  const { data } = await ScheduleInstance.get(`/schedule/${userId}`)
  return await new Promise((resolve) => {
    resolve(data.data)
  })
}

export const getScheduleBySemester = async (
  userId: string,
  semester: string
): Promise<Enrollment[]> => {
  const { data } = await ScheduleInstance.get(
    `/schedule/${userId}/${semester}`
  )
  return await new Promise((resolve) => {
    resolve(data.data)
  })
}

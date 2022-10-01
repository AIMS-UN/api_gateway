// import { getInstance } from '@/configs/axios'
import { Data } from '@/schemas/data'

export const getData = async (msName: string): Promise<Data> => {
  // const ms = getInstance(msName)
  // const { data }: { data: Data } = await ms.get('/data')

  // For now, we'll just return a dummy data
  const data: Data = { name: `Data from ${msName}`, message: 'Hello World!' }

  return await new Promise((resolve) => { resolve(data) })
}

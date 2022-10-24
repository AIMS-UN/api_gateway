import amqplib from 'amqplib'

import { Category, Grade, GradeInput } from '@/schemas/grading'
import { getInstance } from '@/configs/axios'

const gradingInstance = getInstance('grading')
const panic = (message: string): never => { throw new Error(message) }

const amqpUrl = process.env.AMQP_URL ?? panic('Missing AMQP_URL environment variable') as string

const consumer = async (queue: string, callback: (message: amqplib.Message) => Promise<void>): Promise<void> => {
  try {
    const channel = await amqplib.connect(amqpUrl, 'heartbeat=60')
      .then(connection => connection.createChannel())
      .then(channel => channel.assertQueue(queue, { durable: true })
        .then(() => channel))
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    await channel.consume(queue, async (message) => {
      if (message === null) {
        return
      }
      await callback(message)
      channel.ack(message)
    })
  } catch (error) {
    console.error(error)
  }
}

export const loadConsumers = async (): Promise<void> => {
  // Wait for the Message Broker to be ready
  await new Promise(resolve => setTimeout(resolve, 15000))

  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  consumer('category.create', async (message) => {
    const category = JSON.parse(message.content.toString())
    const { data } = await gradingInstance.post('/categories', category)
    if (data == null) console.error('Failed to create category')
  })

  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  consumer('category.update', async (message) => {
    const { id, ...category } = JSON.parse(message.content.toString()) as Category
    const { data } = await gradingInstance.put(`/categories/${id}`, category)
    if (data == null) console.error('Failed to update category')
  })

  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  consumer('category.delete', async (message) => {
    const { id } = JSON.parse(message.content.toString()) as { id: string }
    const { data } = await gradingInstance.delete(`/categories/${id}`)
    if (data == null) console.error('Failed to delete category')
  })

  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  consumer('grade.create', async (message) => {
    const grade = JSON.parse(message.content.toString()) as GradeInput
    const { data } = await gradingInstance.post('/grades', grade)
    if (data == null) console.error('Failed to create grade')
  })

  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  consumer('grade.update', async (message) => {
    const { id, ...grade } = JSON.parse(message.content.toString()) as Grade
    const { data } = await gradingInstance.put(`/grades/${id}`, grade)
    if (data == null) console.error('Failed to update grade')
  })

  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  consumer('grade.delete', async (message) => {
    const { id } = JSON.parse(message.content.toString()) as { id: string }
    const { data } = await gradingInstance.delete(`/grades/${id}`)
    if (data == null) console.error('Failed to delete grade')
  })
}

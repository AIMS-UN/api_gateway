import amqplib from 'amqplib'
import * as GradingService from '@/services/grading'

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
  await new Promise(resolve => setTimeout(resolve, 15000))
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  consumer('category.create', async (message) => {
    const { name, weight, group_id: groupId, subject_id: subjectId } = JSON.parse(message.content.toString())
    await GradingService.createCategory({ name, weight, group_id: groupId, subject_id: subjectId }).catch(console.error)
  })
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  consumer('category.update', async (message) => {
    const { id, name, weight, group_id: groupId, subject_id: subjectId } = JSON.parse(message.content.toString())
    await GradingService.updateCategory({ name, weight, group_id: groupId, subject_id: subjectId }, id).catch(console.error)
  })
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  consumer('category.delete', async (message) => {
    const { id } = JSON.parse(message.content.toString())
    await GradingService.deleteCategory(id).catch(console.error)
  })
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  consumer('grade.create', async (message) => {
    const { category_id: categoryId, student_id: studentId, score } = JSON.parse(message.content.toString())
    await GradingService.createGrade({ category_id: categoryId, student_id: studentId, score }).catch(console.error)
  })
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  consumer('grade.update', async (message) => {
    const { id, category_id: categoryId, student_id: studentId, score } = JSON.parse(message.content.toString())
    await GradingService.updateGrade({ category_id: categoryId, student_id: studentId, score }, id).catch(console.error)
  })
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  consumer('grade.delete', async (message) => {
    const { id } = JSON.parse(message.content.toString())
    await GradingService.deleteGrade(id).catch(console.error)
  })
}

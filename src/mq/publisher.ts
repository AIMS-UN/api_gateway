import amqplib from 'amqplib'
const panic = (message: string): never => { throw new Error(message) }

const amqpUrl = process.env.AMQP_URL ?? panic('Missing AMQP_URL environment variable') as string

export const publish = async (queue: string, message: any): Promise<void> => {
  console.log()
  console.log('Connecting to AMQP server...')
  const connection = await amqplib.connect(amqpUrl, 'heartbeat=60')
  console.log('Connected to AMQP server')
  const channel = await connection.createChannel()
  console.log('AMQP channel created')
  await channel.assertQueue(queue, { durable: true })
  console.log('Asserted queue', queue)
  await channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)), { persistent: true })
  console.log('Published message to queue', queue)
  await channel.close()
  console.log('Closed AMQP channel')
  await connection.close()
  console.log('Closed AMQP connection')
  console.log()
}

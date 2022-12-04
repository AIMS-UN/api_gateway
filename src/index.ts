import 'module-alias/register'
import 'reflect-metadata'

import express from 'express'

import { PORT, HOST, NODE_ENV } from '@/configs/index'
import { loadConsumers } from '@/mq/consumers'
import { startServer } from '@/app'

loadConsumers().then(() => {
  console.log('MQ consumers loaded')
}).catch((error) => {
  console.error('MQ consumers failed to load', error)
})

const app = express()

app.set('trust proxy', true)

// Setup graphql
startServer()
  .then(server => {
    server.applyMiddleware({
      app,
      path: '/graphql',
      cors: { credentials: true, origin: ['https://studio.apollographql.com', process.env.FRONTEND_URL ?? ''] }
    })

    app.listen(PORT, () => {
      console.log(`Server running on ${NODE_ENV} mode at http://${HOST}:${PORT}/graphql`)
    })
  })
  .catch(err => {
    console.error('Error starting server', err)
  })

import 'module-alias/register'

import express from 'express'
import morgan from 'morgan'
import {
  PORT,
  HOST,
  NODE_ENV,
  LOG_LEVEL
} from '@configs/index'

// Create a new express application instance
const app = express()

// Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(morgan(LOG_LEVEL))

// Routes
app.get('/', (req, res) => {
  res.send('Hello World!')
})

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://${HOST}:${PORT} in ${NODE_ENV} mode`)
})

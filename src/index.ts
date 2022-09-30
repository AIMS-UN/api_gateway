import 'module-alias/register'

import express from 'express'
import {
  PORT,
  HOST,
  NODE_ENV
} from '@configs/index'

// Create a new express application instance
const app = express()

// Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Routes
app.get('/', (req, res) => {
  res.send('Hello World!')
})

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://${HOST}:${PORT} in ${NODE_ENV} mode`)
})

import express, { Express } from 'express'
import apiRouter from './routes/api'

const app: Express = express()
app.use('/api', apiRouter)

export default app

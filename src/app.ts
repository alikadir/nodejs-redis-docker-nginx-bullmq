import express, { Express } from 'express'
import apiRouter from './routes/api'
import bullBoardRouter from './routes/bull-board'

const app: Express = express()
app.use(express.json())
app.use('/api', apiRouter)
app.use('/ui', bullBoardRouter)

export default app

import { Router, Request, Response } from 'express'
import { addJob } from '../queues/sample'

const router = Router()

router.get('/', (req:Request, res:Response) => {
  res.send('OK - ' + Date())
})
router.post('/add-job', (req:Request, res:Response) => {
  addJob('foo', req.body)
  res.send('ADDED')
})

export default router

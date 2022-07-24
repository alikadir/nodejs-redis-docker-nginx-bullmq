import { Router, Request, Response } from 'express'
import { addJob } from '../queues/simple'

const router = Router()

router.get('/', (req:Request, res:Response) => {
  res.send('OK - ' + Date())
})
router.post('/add-job', async (req:Request, res:Response) => {
  await addJob('foo', req.body)
  res.send('ADDED')
})

export default router

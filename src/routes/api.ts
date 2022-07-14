import { Router, Request, Response } from 'express'

const router = Router()

router.get('/', (req:Request, res:Response) => {
  res.send('OK - ' + Date())
})
router.post('/add-job', (req:Request, res:Response) => {
  res.send('ADDED')
})

export default router

import { Router, Request, Response } from 'express'
import { addJob as simpleAddJob } from '../queues/simple'
import { addJob as acmeAddJob } from '../queues/acme'

const router = Router()

router.get('/', (req:Request, res:Response) => {
  res.send('OK - ' + Date())
})
router.post('/add-job/:queue', async (req:Request, res:Response) => {
  switch (req.params.queue) {
    case 'simple':
      await simpleAddJob('foo', req.body)
      break
    case 'acme':
      await acmeAddJob('baz', req.body)
      break
  }

  res.send('ADDED')
})

export default router

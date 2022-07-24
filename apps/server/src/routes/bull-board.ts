import { ExpressAdapter } from '@bull-board/express'
import { createBullBoard } from '@bull-board/api'
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter'
import { simpleQueue } from '../queues/simple'
import { repeatableQueue } from '../queues/repeatable'

const serverAdapter = new ExpressAdapter()
createBullBoard({
  queues: [new BullMQAdapter(simpleQueue), new BullMQAdapter(repeatableQueue)],
  serverAdapter
})
serverAdapter.setBasePath('/ui')

export default serverAdapter.getRouter()

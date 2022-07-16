import { ExpressAdapter } from '@bull-board/express'
import { createBullBoard } from '@bull-board/api'
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter'
import { sampleQueue } from '../queues/sample'

const serverAdapter = new ExpressAdapter()
createBullBoard({
  queues: [new BullMQAdapter(sampleQueue)],
  serverAdapter
})
serverAdapter.setBasePath('/ui')

export default serverAdapter.getRouter()

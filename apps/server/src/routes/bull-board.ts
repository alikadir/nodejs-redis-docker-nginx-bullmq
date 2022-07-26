import { ExpressAdapter } from '@bull-board/express'
import { createBullBoard } from '@bull-board/api'
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter'
import queueList from '../queues/index'

const serverAdapter = new ExpressAdapter()
createBullBoard({
  queues: queueList.map(item => new BullMQAdapter(item)),
  serverAdapter
})
serverAdapter.setBasePath('/ui')

export default serverAdapter.getRouter()

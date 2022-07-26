import { Queue, QueueScheduler } from 'bullmq'

type AcmePayload = {
  name: string;
  age: number
}
const redisConnection = {
  connection: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT
  }
}
const queueName = 'acmeQueue'
const acmeQueue = new Queue(queueName, redisConnection)

// that is interesting :) same queue name!
const myQueueScheduler = new QueueScheduler(queueName, redisConnection)

// repeatable job
acmeQueue.add('acme cron', [1, 2, 3], { repeat: { cron: '* * * * *' } })

const addJob = async (name: string, payload: AcmePayload) => {
  await acmeQueue.add(name, payload, { attempts: 3, backoff: 3000 })
}

export { addJob, acmeQueue, myQueueScheduler }

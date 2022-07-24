import { Queue, QueueScheduler } from 'bullmq'

type SimplePayload = {
  name: string;
  age: number
}
const redisConnection = {
  connection: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT
  }
}
const queueName = 'simpleQueue'
const simpleQueue = new Queue(queueName, redisConnection)

// that is interesting :) same queue name!
const myQueueScheduler = new QueueScheduler(queueName, redisConnection)

const addJob = async (name: string, payload: SimplePayload) => {
  await simpleQueue.add(name, payload, { attempts: 3, backoff: 3000 })
}

/*
process.on('exit', async () => {
  (await sampleQueue.getJobs()).forEach(job => {
    job.remove()
    console.log({ removed: job })
  })
})
*/

export { addJob, simpleQueue, myQueueScheduler }

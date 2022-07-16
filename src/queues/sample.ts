import { Queue, QueueScheduler, Worker } from 'bullmq'

type SamplePayload = {
  name: string;
  age: number
}
const redisConnection = {
  connection: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT
  }
}
const queueName = 'sampleQueue'
const sampleQueue = new Queue(queueName, redisConnection)

// that is interesting :) same queue name!
const myQueueScheduler = new QueueScheduler(queueName, redisConnection)
console.log(myQueueScheduler)

// add initial repeatable job
sampleQueue.add('with Cron', [1, 2, 3], { repeat: { cron: '* * * * *' } })
sampleQueue.add('with Config', [9, 8, 7], { repeat: { every: 5000, limit: 50 }, attempts: 3 })

const addJob = async (name: string, payload: SamplePayload) => {
  await sampleQueue.add(name, payload, { attempts: 3, backoff: 3000 })
}

const worker = new Worker(queueName, async job => {
  // do somethings
  await job.updateProgress(23)
  await new Promise((resolve) => {
    setTimeout(() => { resolve(true) }, 2000)
  })
  await job.updateProgress(59)
  await new Promise((resolve) => {
    setTimeout(() => { resolve(true) }, 2000)
  })
  await job.updateProgress(81)
  await job.log('my job log :)')
  if (Object.keys(job.data).length === 0) { throw new Error('data is null!') }

  console.log({ jobData: job.data })
  await job.updateProgress(100)
}, redisConnection)

worker.on('completed', job => {
  console.log(`${job.id} has completed!`)
})

worker.on('failed', (job, err) => {
  console.log(`${job.id} has failed with ${err.message}`)
})

/*
process.on('exit', async () => {
  (await sampleQueue.getJobs()).forEach(job => {
    job.remove()
    console.log({ removed: job })
  })
})
*/

export { addJob, sampleQueue }

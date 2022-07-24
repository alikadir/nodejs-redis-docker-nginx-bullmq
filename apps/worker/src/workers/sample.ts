import { Worker } from 'bullmq'

const redisConnection = {
  connection: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    name: process.env.QUEUE_NAME
  }
}
const queueName = process.env.QUEUE_NAME!

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

export default worker

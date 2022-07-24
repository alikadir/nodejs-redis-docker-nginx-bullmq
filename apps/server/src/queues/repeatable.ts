import { Queue, QueueScheduler } from 'bullmq'

const redisConnection = {
  connection: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT
  }
}
const queueName = 'repeatableQueue'
const repeatableQueue = new Queue(queueName, redisConnection)

// that is interesting :) same queue name!
const myQueueScheduler = new QueueScheduler(queueName, redisConnection)
console.log(myQueueScheduler)

// add initial repeatable job (unique name)
repeatableQueue.add('with Cron', [1, 2, 3], { repeat: { cron: '* * * * *' } })
repeatableQueue.add('with Config', [9, 8, 7], { repeat: { every: 5000, limit: 50 }, attempts: 3 })

/*
process.on('exit', async () => {
  (await sampleQueue.getJobs()).forEach(job => {
    job.remove()
    console.log({ removed: job })
  })
})
*/

export { repeatableQueue }

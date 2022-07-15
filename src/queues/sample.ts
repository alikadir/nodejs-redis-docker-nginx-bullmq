import { Queue, Worker } from 'bullmq'

type SamplePayload ={
  name:string;
  age:number
}
const redisConnection = { connection: { host: process.env.REDIS_HOST, port: process.env.REDIS_PORT } }
const queueName = 'sampleQueue'
const sampleQueue = new Queue(queueName, redisConnection)

const addJob = async (name:string, payload:SamplePayload) => {
  await sampleQueue.add(name, payload)
}

const worker = new Worker(queueName, async job => {
  // aaa
  console.log(job.data)
}, redisConnection)
worker.on('completed', job => {
  console.log(`${job.id} has completed!`)
})

worker.on('failed', (job, err) => {
  console.log(`${job.id} has failed with ${err.message}`)
})

export { addJob }

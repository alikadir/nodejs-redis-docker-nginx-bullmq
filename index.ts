import 'dotenv/config'
import app from './src/app'

const port = process.env.PORT || 3000

console.log(process.env)

app.listen(port, () => {
  console.log(`server start. localhost:${port}`)
})

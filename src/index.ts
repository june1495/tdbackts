/* eslint-disable @typescript-eslint/space-before-function-paren */
import express from 'express'
import mongoose from 'mongoose'
import AllNotes from './routes/notes'
const app = express()

const PORT = 3000

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
async function connectDb() {
  await mongoose.connect('mongodb://localhost:27017/notesdb')
  console.log('database connected')
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
connectDb()

app.use(express.json()) // MIDDLEWARE QUE TRANSFORMA LA REQ.BODY A UN JSON

app.use('/api/v1/diaries', AllNotes)

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`)
})

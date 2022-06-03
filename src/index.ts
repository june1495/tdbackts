/* eslint-disable @typescript-eslint/space-before-function-paren */
import express, { urlencoded } from 'express'
import mongoose from 'mongoose'
import * as dotenv from 'dotenv'
import cors from 'cors'
import morgan from 'morgan'
import passport from 'passport'
import passportConfig from './config/passport'
import NotesRoute from './routes/notes/notes'
import AuthRoute from './routes/auth/auth'
const app = express()

const PORT = 3000

dotenv.config()
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
async function connectDb() {
  await mongoose.connect('mongodb://localhost:27017/notesdb')
  console.log('database connected')
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
connectDb()

// MIDDLEWARES
app.use(morgan('dev'))
app.use(cors())
app.use(urlencoded({ extended: false }))
app.use(express.json()) // MIDDLEWARE QUE TRANSFORMA LA REQ.BODY A UN JSON

app.use(passport.initialize())
passport.use(passportConfig)
// passport.serializeUser((user, done) => {
//   done(null, user.id)
// })
// passport.deserializeUser((id, done) => {
//   User.findById(id, (err, user) => {
//     done(err, user)
//   })
// })
// ROUTES
app.use('/api/v1/diaries', NotesRoute)
app.use('/api/v1/diaries', AuthRoute)

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`)
})

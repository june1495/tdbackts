/* eslint-disable @typescript-eslint/space-before-function-paren */
import express, { urlencoded } from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import morgan from 'morgan'
import passport from 'passport'
import passportConfig from './config/passport'

import AuthRoute from './routes/auth/auth'
import ProductRoute from './routes/product/product'
import PdfRoute from './routes/pdf/pdf'

const app = express()
const PORT: number = 3000

dotenv.config()
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const url: string = process.env.MONGO_URL ?? 'whate'

mongoose
  .connect(url)
  .then(() => {
    console.log('Db Connection successfull')
  })
  .catch((err) => console.log(err))

// MIDDLEWARES
app.use(morgan('dev'))
app.use(cors())
app.use(urlencoded({ extended: false }))
app.use(express.json()) // MIDDLEWARE QUE TRANSFORMA LA REQ.BODY A UN JSON

app.use(passport.initialize())
passport.use(passportConfig)

// ROUTES
app.use('/api/v1', AuthRoute) // ROUTE FOR AUTH
app.use('/api/v1', ProductRoute) // ROUTE FOR PRODUCTS
app.use('/api/v1', PdfRoute) // ROUTE FOR PDF

// SERVER
app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`)
})

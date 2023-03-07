/* eslint-disable @typescript-eslint/space-before-function-paren */
import express, { urlencoded } from 'express'
import cors from 'cors'
import morgan from 'morgan'
import passport from 'passport'
import passportConfig from './config/passport'
// import { server as app } from '../app'
import AuthRoute from './routes/auth/auth'
import ProductRoute from './routes/product/product'
import PdfRoute from './routes/pdf/pdf'
import PdfEditor from './routes/pdfeditor/index'
import UploadRoute from './routes/upload/index'

// const PORT: number = 3000 || process.env.PORT
const app = express()

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type

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
app.use('/api/v1', PdfEditor) // ROUTE FOR PDF
app.use('/api/v1', UploadRoute) // ROUTE FOR UPLOAD

export default app

/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express'
import * as controller from './controller'

const router = express.Router()

router.post('/register', controller.register).post('/login', controller.login)

export default router

/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express'
import * as controller from './controller'
const router = express.Router()

router.get('/allusers', controller.getAllUsers)

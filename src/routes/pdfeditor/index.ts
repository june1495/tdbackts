/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express'
import * as controller from './controller'
const router = express.Router()

router.route('/pdfeditor').post(controller.editPdf)

export default router

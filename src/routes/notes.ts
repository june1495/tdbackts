/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express'
import * as controller from './controller'
const router = express.Router()

router
  .post('/createnote', controller.CreateNote)
  .get('/notes', controller.getAllNotes)
  .get('/notes/:id', controller.getNoteById)
  .delete('/:id', controller.deleteNoteByid)
  .put('/:id', controller.updateNoteById)

export default router

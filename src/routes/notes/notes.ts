/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express'
import passport from 'passport'
import * as controller from './controller'
const router = express.Router()

router
  .post(
    '/createnote',
    passport.authenticate('jwt', { session: false }),
    controller.CreateNote,
  )
  .get('/notes', controller.getAllNotes)
  .get('/notes/:id', controller.getNoteById)
  .delete(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    controller.deleteNoteByid,
  )
  .put(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    controller.updateNoteById,
  )

export default router

/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express'
import passport from 'passport'
import * as controller from './controller'
const router = express.Router()

router
  .post(
    '/products',
    passport.authenticate('jwt', { session: false }),
    controller.createProduct,
  )
  .get(
    '/products/:id',
    passport.authenticate('jwt', { session: false }),
    controller.getProductById,
  )
  .put(
    '/products/:id',
    passport.authenticate('jwt', { session: false }),
    controller.updateById,
  )
  .delete(
    '/products/:id',
    passport.authenticate('jwt', { session: false }),
    controller.deleteById,
  )

export default router

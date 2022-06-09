/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express'
import * as controller from './controller'
const router = express.Router()

router
  .post('/products', controller.createProduct)
  .get('/product/:id', controller.getProductById)
  .get('/products/:id', controller.getProducts)
  .put('/product/:id', controller.updateById)
  .delete('/product/:id', controller.deleteById)

export default router

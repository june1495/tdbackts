/* eslint-disable @typescript-eslint/space-before-function-paren */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import supertest from 'supertest'
// import { ProductInterface } from '../src/types'
import { listen as app } from '../app'
import mongoose from 'mongoose'
// import { ProductModel } from '../src/models/central'
import {
  userHeader,
  createProduct,
  // getProduct,
  validUser,
} from './helpers/validProduct'

const request = supertest(app)

beforeAll(() => {
  // await ProductModel.deleteMany({})
})
afterAll(() => {
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  mongoose.connection.close()
  app.close()
})
const validProduct = async (prodc = createProduct) => {
  const product = await request
    .post('/api/v1/products')
    .set({ user: userHeader.user })
    .send(prodc)
  return product
}
// eslint-disable-next-line @typescript-eslint/promise-function-async
const postUser = (user = validUser) => {
  const agent = request.post('/api/v1/register').send(user)
  return agent
}
describe('Create Product in JESTLOCAL', () => {
  test('Should create a new Product', async () => {
    const response = await validProduct()
    expect(response.status).toBe(200)
  })
})

// describe('GET /product', () => {
//   test('Should get a Product', async () => {
//     const product = await request
//       .get('/api/v1/product/62b49612f3cfe9e1dfa43655')
//       .send()
//     console.log(product.body)
//   })
//   test('Should respond with an object', async () => {
//     const response = await request
//       .get('/api/v1/product/632c8c95d631f10f016565e6')
//       .send()

//     console.log(response.body)
//     expect<ProductInterface>(response.body).toMatchObject<ProductInterface>(
//       getProduct,
//     )
//   })
//   test('Should not have property name', async () => {
//     const response = await request
//       .get('/api/v1/product/632c8c95d631f10f016565e6')
//       .send()

//     console.log(response.body)
//     expect<ProductInterface>(response.body).not.toHaveProperty('name')
//   })
// })

// eslint-disable-next-line @typescript-eslint/promise-function-async

describe('User Registration', () => {
  it('return 200 when reg. is valid', async () => {
    const response = await postUser()
    expect(response.status).toBe(200)
  })
  test('register with error', async () => {
    const body = {
      username: null,
      email: 'test@test.com',
      password: null,
    }
    const agent = await request.post('/api/v1/register').send(body)
    console.log(agent.body)
    expect(agent.statusCode).toBe(500)
  })
  test('register with error', async () => {
    const body = {
      username: 'franco melgar',
      email: 'test@test.com',
      password: null,
    }
    const agent = await request.post('/api/v1/register').send(body)
    console.log(agent.body)
    expect(agent.statusCode).toBe(500)
  })
})

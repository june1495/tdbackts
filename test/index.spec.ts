/* eslint-disable @typescript-eslint/space-before-function-paren */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import app from '../src/index'
import supertest from 'supertest'
import { ProductInterface } from '../src/types'

const request = supertest(app)

const userHeader = {
  user: '62b2330b67e09a5dc79ee1ea',
}

const createProduct = {
  product: 'Inka cola',
  category: 'Soda',
  ubication: 'Peru',
  price: 200,
}
// eslint-disable-next-line @typescript-eslint/promise-function-async
const validProduct = (prodc = createProduct) => {
  const product = request
    .post('/api/v1/products')
    .set({ user: userHeader.user })
    .send(prodc)
  return product
}
describe('Create Product in crud_testingDB', () => {
  test('Should create a new Product', async () => {
    const response = await validProduct()
    expect(response.status).toBe(200)
  })
})

describe('GET /product', () => {
  test('Should get a Product', async () => {
    const product = await request
      .get('/api/v1/product/62b49612f3cfe9e1dfa43655')
      .send()
    console.log(product.body)
  })
  test('Should respond with an object', async () => {
    const response = await request
      .get('/api/v1/product/62b49612f3cfe9e1dfa43655')
      .send()
    expect(response.body).toMatchObject<ProductInterface>(response.body)
  })
})

// const validUser = {
//   username: 'jest',
//   email: 'jest@test.com',
//   password: '123456',
// }
// // eslint-disable-next-line @typescript-eslint/promise-function-async
// const postUser = (user = validUser) => {
//   const agent = request.post('/api/v1/register').send(user)
//   return agent
// }
// describe('User Registration', () => {
//   it('return 200 when reg. is valid', async () => {
//     const response = await postUser()
//     expect(response.status).toBe(200)
//   })
// })

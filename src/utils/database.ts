/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import mongoose from 'mongoose'

const connect = (
  { username, password, databaseName, url = '' }: any,
  options = {},
) => {
  // const databaseName = 'donapp';
  let dburl
  if (username !== undefined && password !== undefined) {
    dburl = `mongodb+srv://${username}:${password}@ftbdev.17jlte7.mongodb.net/${databaseName}?retryWrites=true&w=majority`
    console.log('Connected from MongoAtlas')
  } else {
    dburl = `mongodb://${url}`
    console.log('Connected from Local')
  }

  mongoose.connect(dburl, {
    ...options,
  })

  mongoose.connection.on('connected', () => {
    // console.log('Database connected')
  })
  mongoose.connection.on('close', () => {
    // console.log('Database disconnected')
  })
  mongoose.connection.on('error', (error) => {
    console.log(`Database error: ${error}`)
  })
  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      console.log('Database disconnected, becouse app termination')
      process.exit(0)
    })
  })
}
const disconnect = () => {
  mongoose.connection.close(() => {
    console.log('Database disconnected successfully')
  })
}
export { connect, disconnect }

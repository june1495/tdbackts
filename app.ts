// import express from 'express'
import dotenv from 'dotenv'
import { connect } from './src/utils/database'
// import http from 'http'
import app from './src/index'
dotenv.config()
const database: string = process.env.MONGO_DB ?? 'testlocal'
const name: string = process.env.MONGO_USER ?? 'ftbdev'
const pass: string = process.env.MONGO_PASS ?? 'ftbdev'
const url: string = process.env.MONGO_URL ?? ''

connect({
  username: name,
  password: pass,
  databaseName: database,
  url: url,
})

// SERVER
// necesario si vamos a usar socket.io
// const server = http.createServer(app)

const listen = app.listen(process.env.PORT, () => {
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  console.log(`Server running on PORT ${process.env.PORT}`)
})

export { listen }

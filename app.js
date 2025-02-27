import 'dotenv/config'
import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import knex from 'knex'
import morgan from 'morgan'

const db = knex({
  client: 'pg',
  connection: process.env.DB_URL
})

const app = express()
app.use(express.json())
app.use(cors())
app.use(helmet())
app.use(morgan('short'))

app.get('/', (_req, res) => {
  res.json({ msg: 'Hello world!' })
})

app.post('/clicks', async (_req, res) => {
  try {
    await db('clicks').insert({})
    res.status(201).json({ msg: 'Click!' })
  } catch (err) {
    res.status(500).json({ msg: err.message })
    console.error(err)
  }
})

app.get('/clicks/count', async (_req, res) => {
  try {
    const data = await db('clicks').select().count()
    const count = data[0].count
    res.json({ count })
  } catch (err) {
    res.status(500).json({ msg: err.message })
    console.error(err)
  }
})

const PORT = process.env.PORT
app.listen(PORT, () => console.log(`API listening on port ${PORT}`))

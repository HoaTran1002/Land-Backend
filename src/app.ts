import express from 'express'
import { connectDB } from './config/db/mongodb.db'
import useRoutes from './routes/index.route'
import { env } from '~/config/env'

const PORT = env.PORT
const app = express()
app.use(express.json())
app.use(
  express.urlencoded({
    extended: false
  })
)
connectDB()
useRoutes(app)

app.listen(PORT)

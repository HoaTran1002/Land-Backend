import express from 'express'
import { connectDB } from './config/db/mongodb.db'
import useRoutes from './routes/index.route'
import { env } from '~/config/env'
import useBuiltIn from './middlewear/built.middlewear'
import useThirdParty from './middlewear/third.middlewear'

const PORT = env.PORT
const app = express()

connectDB()
useBuiltIn(app)
useThirdParty(app)
useRoutes(app)

app.listen(PORT)

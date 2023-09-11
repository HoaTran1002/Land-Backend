import { Express } from 'express'
import express from 'express'
import cookieParser from 'cookie-parser'
const useBuiltIn = async (app: Express): Promise<void> => {
  app.use(express.json())
  app.use(
    express.urlencoded({
      extended: false
    })
  )
  app.use(cookieParser())
}
export default useBuiltIn

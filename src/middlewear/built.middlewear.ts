import { Express } from 'express'
import express from 'express'
const useBuiltIn = async (app: Express): Promise<void> => {
  app.use(express.json())
  app.use(
    express.urlencoded({
      extended: false
    })
  )
}
export default useBuiltIn

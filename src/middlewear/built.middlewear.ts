import { Express } from 'express'
import express from 'express'
import cookieParser from 'cookie-parser'

import mongoose from 'mongoose'
import cookieSession from 'cookie-session'
import passport from 'passport'

const useBuiltIn = async (app: Express): Promise<void> => {
  app.use(express.json())
  app.use(
    express.urlencoded({
      extended: false
    })
  )
  app.use(cookieParser())
  // setting up cookieSession
  app.use(
    cookieSession({
      maxAge: 24 * 60 * 60 * 1000,
      keys: ['habchvdbhchdc']
    })
  )
  // initialize passport
  app.use(passport.initialize())
  app.use(passport.session())
}
export default useBuiltIn

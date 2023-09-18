import { NextFunction, Request, Response } from 'express'
import { IAccount, IResonseObject } from '~/interfaces/index.interface'
import jwt from 'jsonwebtoken'
import { env } from '~/config/env'
import accountModel from '~/models/account.model'

interface IDecode {
  iss: string
  sub: string
  iat: number
  exp: number
}

const authMiddlewear = async (
  req: Request<unknown, unknown, IAccount, unknown>,
  res: Response,
  next: NextFunction
): Promise<IResonseObject | Response | void | unknown> => {
  const response: IResonseObject = {
    message: '',
    status: 200
  }
  const tokenHeader = req.headers['authorization']

  const tokenParts = tokenHeader && tokenHeader.split(' ')
  const token = tokenParts && tokenParts[1]

  if (token == null) {
    response.message = 'Token is missing!'
    response.status = 401
    return res.status(401).json(response)
  }

  jwt.verify(token, env.ACCESS_TOKEN_SECRET, (err, decode: any) => {
    if (err) {
      response.message = 'Token is invalid!'
      response.status = 401
      console.log('err 1')
      return res.status(401).json(response)
    }
    const { sub }: IDecode = decode

    const acc = accountModel.findById({ _id: sub })
    if (acc == null) {
      response.message = 'Forbidden!'
      response.status = 403
      console.log('lỗi 3')
      return res.status(403).json(response)
    }
    // return res.status(403).json(response)
  })

  //   console.log('token:', token)

  next()
}

export default authMiddlewear

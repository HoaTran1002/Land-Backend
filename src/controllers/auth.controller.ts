import { NextFunction, Request, Response } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { IResonseObject, IResponseErrorObject } from '~/interfaces/index.interface'
import accountModel from '~/models/account.model'

interface IAccountRequestBody {
  name: string
  password: string
  role: string
  email: string
}
const encodedTonken = ({ _id }: { _id: string }) => {
  return jwt.sign(
    {
      iss: 'Tran Van Hoa',
      sub: _id,
      iat: Date.now(),
      exp: Date.now() + 3
    },
    'JsonwebtokenSecretkeyAuthencation',
    {
      algorithm: 'HS256'
    }
  )
}
export const singUp = async (
  req: Request<unknown, unknown, IAccountRequestBody, unknown>,
  res: Response
): Promise<IResonseObject | Response | void | unknown> => {
  const response: IResonseObject = {
    status: 201,
    message: 'created account success! '
  }
  const token = encodedTonken({ _id: '12334' })
  const accountAlreadyExists = await accountModel.findOne({ email: req.body.email })
  if (accountAlreadyExists) {
    response.message = 'email already exists'
    response.status = 409
    return res.status(409).json(response)
  }
  const newAccount = new accountModel<IAccountRequestBody>({
    name: req.body.name,
    password: req.body.password,
    email: req.body.email,
    role: req.body.role
  })

  await newAccount.save()
  await res.setHeader('Authorization', token)
  return res.status(201).json({ success: response })
}
export const singIn = async (req: Request, res: Response): Promise<IResonseObject | Response | void | unknown> => {
  return res.json()
}
export const logOut = async (req: Request, res: Response): Promise<IResonseObject | Response | void | unknown> => {
  return res.json()
}

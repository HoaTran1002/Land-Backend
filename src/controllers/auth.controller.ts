import { NextFunction, Request, Response } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { IAccount, IResonseObject, IResponseErrorObject } from '~/interfaces/index.interface'
import accountModel from '~/models/account.model'
import { env } from '~/config/env'
import bcrypt from 'bcrypt'

interface IAccountRequestBody {
  name: string
  password: string
  role: string
  email: string
}
let refreshTokens: string[] = []
const encodeAccessToken = ({ _id }: { _id: string }) => {
  const currentTimeInSeconds = Math.floor(Date.now() / 1000) // Chuyển đổi sang giây
  const expiresIn = 30 // 20 giây

  return jwt.sign(
    {
      iss: 'Tran Van Hoa',
      sub: _id,
      iat: currentTimeInSeconds,
      exp: currentTimeInSeconds + expiresIn // Sửa đổi thời gian hết hạn thành giây
    },
    env.ACCESS_TOKEN_SECRET,
    {
      algorithm: 'HS256'
    }
  )
}

const encodeRefreshToken = ({ _id }: { _id: string }) => {
  const currentTimeInSeconds = Math.floor(Date.now() / 1000) // Chuyển đổi sang giây
  const expiresIn = 365 * 24 * 60 * 60 // 365 ngày, tính bằng giây

  return jwt.sign(
    {
      iss: 'Tran Van Hoa',
      sub: _id,
      iat: currentTimeInSeconds,
      exp: currentTimeInSeconds + expiresIn // Sửa đổi thời gian hết hạn thành giây
    },
    env.REFRESH_TOKEN_SECRET,
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

  const accountAlreadyExists = await accountModel.findOne({ email: req.body.email })
  if (accountAlreadyExists) {
    response.message = 'email already exists'
    response.status = 409
    return res.status(409).json(response)
  }
  const salt = await bcrypt.genSalt(10)
  const hashed = await bcrypt.hash(req.body.password, salt)
  const newAccount = new accountModel<IAccount>({
    name: req.body.name,
    password: hashed,
    email: req.body.email,
    role: req.body.role
  })

  await newAccount.save()
  const user: IAccount | null = await accountModel.findOne({ email: req.body.email })

  if (user?._id) {
    const token = encodeAccessToken({ _id: user?._id })
    const refreshToken = encodeRefreshToken({ _id: user._id })
    refreshTokens.push(refreshToken)
    res.cookie('refreshToken', refreshToken, {
      path: '/',
      sameSite: 'strict',
      httpOnly: true,
      secure: false
    })
    res.setHeader('Authorization', token)
    return res.status(response.status || 200).json({ success: response, token: token, refToken: refreshToken })
  }

  return res.status(201).json({ success: response })
}
export const singIn = async (
  req: Request<unknown, unknown, IAccountRequestBody, unknown>,
  res: Response
): Promise<IResonseObject | Response | void | unknown> => {
  const response: IResonseObject = {
    message: '',
    status: 200
  }
  const user: IAccount | null = await accountModel.findOne({ email: req.body.email })
  if (!user) {
    response.message = 'email not found'
    response.status = 404
    return res.status(response.status).json(response)
  } else if (user.password) {
    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if (validPassword === false) {
      response.message = 'incorrect password'
      response.status = 404
      return res.status(response.status).json(response)
    }
  }

  if (user?._id) {
    const token = encodeAccessToken({ _id: user?._id })
    const refreshToken = encodeRefreshToken({ _id: user?._id })
    refreshTokens.push(refreshToken)
    res.cookie('refreshToken', refreshToken, {
      path: '/',
      sameSite: 'strict',
      httpOnly: true,
      secure: false
    })
    res.setHeader('Authorization', token)
    response.message = 'login success'
    response.status = 201
    return res.status(response.status || 200).json({ success: response, token: token, refToken: refreshToken })
  }

  return res.status(response.status || 200).json({ success: response })
}
export const requestRefreshToken = async (
  req: Request,
  res: Response
): Promise<IResonseObject | Response | void | string | unknown> => {
  console.log('dang refresh')
  const response: IResonseObject = {
    message: 'success',
    status: 200
  }
  console.log('refresh token :', req.cookies.refreshToken)
  const refreshToken = await req.cookies.refreshToken

  if (!refreshToken) {
    response.message = `you're not authencation`
    response.status = 401
    return res.status(401).json(response)
  }
  if (!refreshTokens.includes(refreshToken)) {
    response.message = `refresh token is not valid`
    response.status = 403
    return res.status(403).json(response)
  }
  jwt.verify(refreshToken, env.REFRESH_TOKEN_SECRET, (err: unknown, decode: any) => {
    if (err) {
      console.log(err)
    }
    const { sub }: { sub: string } = decode
    const _id = sub
    refreshTokens = refreshTokens.filter((token) => token !== refreshToken)
    const newAccessToken = encodeAccessToken({ _id })
    const newRefreshToken = encodeRefreshToken({ _id })
    refreshTokens.push(newRefreshToken)
    res.cookie('refreshToken', newRefreshToken, {
      path: '/',
      sameSite: 'strict',
      httpOnly: true,
      secure: false
    })
    console.log('dang refresh')
    res.setHeader('Authorization', newAccessToken)
    response.message = 'login success'
    response.status = 200
    console.log('token assecc:', newAccessToken)
    console.log(`newAccessToken: ${newAccessToken}, refreshToken: ${newRefreshToken} `)
  })
  return res.status(response.status || 500).json(response)
}
export const logOut = async (req: Request, res: Response): Promise<IResonseObject | Response | void | unknown> => {
  res.clearCookie('refreshToken')
  refreshTokens.filter((token) => token !== req.cookies.refreshToken)
  const response: IResonseObject = {
    message: 'logged out!',
    status: 200
  }
  return res.status(200).json(response)
}

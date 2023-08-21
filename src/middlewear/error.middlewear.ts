import { NextFunction, Request, Response } from 'express'

import { IResonseObject, IResponseErrorObject } from '~/interfaces/index.interface'
export enum HttpCode {
  OK = 200,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500
}

export const notFound = (reques: Request, response: Response) => {
  response.status(404).json({ message: 'Not Found ' })
}

export const asyncHandleError = (
  asyncHandle: (request: Request, response: Response) => Promise<IResonseObject | Response | void | unknown>
) => {
  const handleErr = (request: Request, response: Response, next: NextFunction) => {
    asyncHandle(request, response).catch(next)
  }
  return handleErr
}

export const handleTrustedError = (err: any): IResponseErrorObject => {
  const response: IResponseErrorObject = {
    message: 'The system is handling the error. please wait!',
    status: 500
  }

  if (err && typeof err === 'object' && 'message' in err) {
    response.message = err.message
    response.status = err.status
  }
  return response
}
export const handleError = (err: any, req: Request, res: Response, next: NextFunction) => {
  const errorResponse: IResponseErrorObject = handleTrustedError(err)
  return res.status(errorResponse.status ? errorResponse.status : 500).json({ message: errorResponse.message })
}

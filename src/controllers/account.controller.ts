import Account from '~/models/account.model'
import { NextFunction, Request, Response } from 'express'
import { IAccount, IResonseObject } from '~/interfaces/index.interface'

export const getAll = async (
  request: Request,
  response: Response
): Promise<IResonseObject | Response | void | unknown> => {
  const accounts = await Account.find()
  const res: IResonseObject = {
    message: 'query success',
    data: accounts
  }
  return response.json(res)
}

export const findById = async (req: Request, res: Response): Promise<void> => {}
export const create = async (req: Request, res: Response): Promise<void> => {}
export const remove = async (req: Request, res: Response): Promise<void> => {}
export const update = async (reeq: Request, res: Response): Promise<void> => {}

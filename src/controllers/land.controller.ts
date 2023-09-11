import { Request, Response } from 'express'
import { IResonseObject } from '~/interfaces/index.interface'

export const getAll = async (req: Request, res: Response): Promise<IResonseObject | Response | void | unknown> => {
  return res.status(200).json({ message: 'get all success' })
}

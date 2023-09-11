import { Express } from 'express'
import authMiddlewear from '~/middlewear/auth.middlewear'
import { handleError, notFound } from '~/middlewear/error.middlewear'
import accountRouter from '~/routes/account.route'
import authRouter from '~/routes/auth.route'
import landRouter from '~/routes/land.route'
const useRoutes = async (app: Express): Promise<void> => {
  app.use('/api/v1/account', accountRouter)
  app.use('/api/v1/auth', authRouter)
  app.use('/api/v1/land', authMiddlewear, landRouter)
  app.use(handleError)
  app.use(notFound)
}
export default useRoutes

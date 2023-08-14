import { Express } from 'express'
import { handleError, notFound } from '~/middlewear/error.middlewear'
import accountRouter from '~/routes/account.route'
const useRoutes = async (app: Express): Promise<void> => {
  app.use('/api/v1/account', accountRouter)
  app.use(handleError)
  app.use(notFound)
}
export default useRoutes

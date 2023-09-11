import { getAll } from '~/controllers/land.controller'
import { asyncHandleError } from '~/middlewear/error.middlewear'
import { Router } from 'express'
const router = Router()

router.get('/getAll', asyncHandleError(getAll))

export default router

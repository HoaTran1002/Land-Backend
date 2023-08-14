import { Router } from 'express'
import { create, findById, getAll, remove, update } from '~/controllers/account.controller'
import { asyncHandleError } from '~/middlewear/error.middlewear'
const router = Router()

router.get('/', asyncHandleError(getAll))
router.post('/create', asyncHandleError(create))
router.post('/:id/findById', asyncHandleError(findById))
router.delete('/:id/remove', asyncHandleError(remove))
router.patch('/:id/update', asyncHandleError(update))

export default router

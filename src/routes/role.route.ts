import { Router } from 'express'
import { singUp } from '~/controllers/auth.controller'
import { asyncHandleError } from '~/middlewear/error.middlewear'
const route = Router()

route.post('/singUp', asyncHandleError(singUp))

import { Router } from 'express'
import { logOut, requestRefreshToken, singIn, singUp } from '~/controllers/auth.controller'
import { asyncHandleError } from '~/middlewear/error.middlewear'
const route = Router()

route.post('/singUp', asyncHandleError(singUp))
route.post('/singIn', asyncHandleError(singIn))
route.post('/logOut', asyncHandleError(logOut))
route.post('/refreshToken', asyncHandleError(requestRefreshToken))
export default route

import { Router } from 'express'
import passport from '~/middlewear/passport.middlewear'
import { authGoogle, logOut, requestRefreshToken, singIn, singUp } from '~/controllers/auth.controller'
import { asyncHandleError } from '~/middlewear/error.middlewear'

const route = Router()

route.post('/google', passport.authenticate('google'), asyncHandleError(authGoogle))
route.post('/singUp', asyncHandleError(singUp))
route.post('/singIn', asyncHandleError(singIn))
route.post('/logOut', asyncHandleError(logOut))
route.post('/refreshToken', asyncHandleError(requestRefreshToken))
export default route

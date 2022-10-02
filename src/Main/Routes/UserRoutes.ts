import { makeLoginController } from './../Factories/User/LoginFactory'
import { makeRegisterUserController } from './../Factories/User/RegisterUserFactory'
import { adaptRoute } from '../Adapters/Express/ExpressRouteAdapters'
import { Router } from 'express'

export default (router: Router): void => {
  router.post('/user', adaptRoute(makeRegisterUserController()))
  router.post('/login', adaptRoute(makeLoginController()))
}

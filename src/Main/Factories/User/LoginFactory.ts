import { DbFindUserByEmail } from './../../../Data/UseCases/User/FindUserByEmail/DbFindUserByEmail'
import { FindUserByEmailMySQLRepository } from './../../../Infra/Db/MySQL/Repository/User/FindUserByEmailMySQLRepository'
import { Controller } from '../../../Presentation/protocols'
import { LoginController } from '../../../Presentation/Controllers/User/LoginController/LoginController'
import { makeLoginValidation } from './LoginValidationFactory'

export const makeLoginController = (): Controller => {
  const findUserByEmailRepository = new FindUserByEmailMySQLRepository()
  const findUserByEmailUseCase = new DbFindUserByEmail(findUserByEmailRepository)
  return new LoginController(findUserByEmailUseCase, makeLoginValidation())
}

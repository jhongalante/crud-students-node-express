import { DbFindUserByEmail } from './../../../Data/UseCases/User/FindUserByEmail/DbFindUserByEmail'
import { FindUserByEmailMySQLRepository } from './../../../Infra/Db/MySQL/Repository/User/FindUserByEmailMySQLRepository'
import { DbAddUser } from '../../../Data/UseCases/User/AddUser/DbAddUser'
import { AddUserMySQLRepository } from './../../../Infra/Db/MySQL/Repository/User/AddUserMySQLRepository'
import { Controller } from '../../../Presentation/protocols'
import { RegisterUserController } from '../../../Presentation/Controllers/User/RegisterUser/RegisterUserController'
import { makeRegisterUserValidation } from './RegisterUserValidationFactory'

export const makeRegisterUserController = (): Controller => {
  const registerUserRepository = new AddUserMySQLRepository()
  const findUserByEmailRepository = new FindUserByEmailMySQLRepository()
  const registerUserUseCase = new DbAddUser(registerUserRepository)
  const findUserByEmailUseCase = new DbFindUserByEmail(findUserByEmailRepository)
  return new RegisterUserController(registerUserUseCase, findUserByEmailUseCase, makeRegisterUserValidation())
}

import { IFindUserByEmail } from './../../../../Domain/UseCases/User/FindUserByEmail'
import { IAddUser } from './../../../../Domain/UseCases/User/AddUser'
import { ServerError } from '../../../Errors'
import { badRequest, created, internalServerError } from '../../../Helpers/Http/HttpHelpers'
import { Controller, HttpRequest, HttpResponse } from '../../../protocols'
import { Validation } from '../../../protocols/Validation'

export class RegisterUserController implements Controller {
  constructor (
    private readonly addUser: IAddUser,
    private readonly findUserByEmail: IFindUserByEmail,
    private readonly validation: Validation) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }

      const { email, password } = httpRequest.body
      const foundUser = await this.findUserByEmail.findByEmail(email)
      if (foundUser) {
        return badRequest('Usuário já cadastrado')
      }
      const registeredUser = await this.addUser.add({
        email,
        password
      })
      return created(registeredUser)
    } catch (error) {
      console.error(error)
      return internalServerError(new ServerError(error))
    }
  }
}

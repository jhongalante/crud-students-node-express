import { IFindUserByEmail } from './../../../../Domain/UseCases/User/FindUserByEmail'
import { ServerError } from '../../../Errors'
import { badRequest, internalServerError, ok } from '../../../Helpers/Http/HttpHelpers'
import { Controller, HttpRequest, HttpResponse } from '../../../protocols'
import { Validation } from '../../../protocols/Validation'
import { sign } from 'jsonwebtoken'
import bcrypt from 'bcrypt'

export class LoginController implements Controller {
  constructor (
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
      const comparedPassword = bcrypt.compareSync(password, foundUser.password)

      if (!foundUser || !comparedPassword) {
        return badRequest('Email ou senha incorretos!')
      }

      const token = sign({
        userId: foundUser.id
      },
      'Logado',
      {
        expiresIn: '24h'
      }
      )

      return ok({
        user: { id: foundUser.id, email: foundUser.email },
        token
      })
    } catch (error) {
      console.error(error)
      return internalServerError(new ServerError(error))
    }
  }
}

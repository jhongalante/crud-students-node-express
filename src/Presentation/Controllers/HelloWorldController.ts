import { internalServerError, ok } from '../Helpers/Http/HttpHelpers'
import { Controller, HttpRequest, HttpResponse } from '../protocols'

export class HelloWorldController implements Controller {
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      return ok('Olá, Grupo A! Bem-vindo à minha API para o Módulo Acadêmico do Desafio! Espero que gostem!')
    } catch (error) {
      return internalServerError(error)
    }
  }
}

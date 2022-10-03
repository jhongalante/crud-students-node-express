import { IFindAllStudents } from '../../../../Domain/UseCases/Student/FindAllStudents'
import { ServerError } from '../../../Errors'
import { ok, internalServerError } from '../../../Helpers/Http/HttpHelpers'
import { Controller, HttpRequest, HttpResponse } from '../../../protocols'

export class FindAllStudentsController implements Controller {
  constructor (private readonly findAllStudents: IFindAllStudents) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const allStudents = await this.findAllStudents.findAll()
      return ok(allStudents)
    } catch (error) {
      console.error(error)
      return internalServerError(new ServerError(error))
    }
  }
}

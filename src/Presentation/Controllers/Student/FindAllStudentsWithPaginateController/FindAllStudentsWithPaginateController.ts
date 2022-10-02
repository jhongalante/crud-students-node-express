import { IFindAllStudentsWithPaginate } from '../../../../Domain/UseCases/FindAllStudentsWithPaginate'
import { ServerError } from '../../../Errors'
import { ok, internalServerError } from '../../../Helpers/Http/HttpHelpers'
import { Controller, HttpRequest, HttpResponse } from '../../../protocols'

export class FindAllStudentsWithPaginateController implements Controller {
  constructor (private readonly findAllStudents: IFindAllStudentsWithPaginate) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { page, size } = httpRequest.query
      const allStudents = await this.findAllStudents.findAllWithPaginate(page, size)
      return ok(allStudents)
    } catch (error) {
      console.error(error)
      return internalServerError(new ServerError(error))
    }
  }
}

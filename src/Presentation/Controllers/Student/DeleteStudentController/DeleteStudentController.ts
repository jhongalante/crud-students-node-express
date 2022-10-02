import { IDeleteStudent } from '../../../../Domain/UseCases/DeleteStudent'
import { ServerError } from '../../../Errors'
import { badRequest, ok, internalServerError } from '../../../Helpers/Http/HttpHelpers'
import { Controller, HttpRequest, HttpResponse } from '../../../protocols'
import { Validation } from '../../../protocols/Validation'

export class DeleteStudentController implements Controller {
  constructor (private readonly deleteStudent: IDeleteStudent, private readonly validation: Validation) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.params)
      if (error) {
        return badRequest(error)
      }

      const { academicRecord } = httpRequest.params
      const updatedStudent = await this.deleteStudent.delete(academicRecord)
      if (!updatedStudent) {
        return badRequest('Aluno não encontrado')
      }
      return ok(updatedStudent)
    } catch (error) {
      console.error(error)
      return internalServerError(new ServerError(error))
    }
  }
}

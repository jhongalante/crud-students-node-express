import { IUpdateStudent } from '../../../../Domain/UseCases/UpdateStudent'
import { ServerError } from '../../../Errors'
import { badRequest, ok, internalServerError } from '../../../Helpers/Http/HttpHelpers'
import { Controller, HttpRequest, HttpResponse } from '../../../protocols'
import { Validation } from '../../../protocols/Validation'

export class UpdateStudentController implements Controller {
  constructor (private readonly updateStudent: IUpdateStudent, private readonly validation: Validation) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }

      const { name, email } = httpRequest.body
      const { academicRecord } = httpRequest.params
      const updatedStudent = await this.updateStudent.update({
        name,
        email,
        academicRecord
      })
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

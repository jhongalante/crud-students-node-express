import { IFindStudentByAcademicRecord } from '../../../../Domain/UseCases/FindStudentByAcademicRecord'
import { ServerError } from '../../../Errors'
import { badRequest, ok, internalServerError } from '../../../Helpers/Http/HttpHelpers'
import { Controller, HttpRequest, HttpResponse } from '../../../protocols'
import { Validation } from '../../../protocols/Validation'

export class FindStudentByAcademicRecordController implements Controller {
  constructor (private readonly findStudentByAcademicRecord: IFindStudentByAcademicRecord, private readonly validation: Validation) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.params)
      if (error) {
        return badRequest(error)
      }

      const { academicRecord } = httpRequest.params
      const updatedStudent = await this.findStudentByAcademicRecord.findByAcademicRecord(academicRecord)
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

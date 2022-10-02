import { IAddStudent } from '../../../../Domain/UseCases/Student/AddStudent'
import { IFindStudentByAcademicRecord } from '../../../../Domain/UseCases/Student/FindStudentByAcademicRecord'
import { ServerError } from '../../../Errors'
import { badRequest, created, internalServerError } from '../../../Helpers/Http/HttpHelpers'
import { Controller, HttpRequest, HttpResponse } from '../../../protocols'
import { Validation } from '../../../protocols/Validation'

export class RegisterStudentController implements Controller {
  constructor (
    private readonly addStudent: IAddStudent,
    private readonly findStudent: IFindStudentByAcademicRecord,
    private readonly validation: Validation) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }

      const { name, email, cpf, academicRecord } = httpRequest.body
      if (await this.findStudent.findByAcademicRecord(academicRecord)) {
        return badRequest('Usuário já cadastrado')
      }
      const registeredStudent = await this.addStudent.add({
        name,
        email,
        cpf,
        academicRecord
      })
      return created(registeredStudent)
    } catch (error) {
      console.error(error)
      return internalServerError(new ServerError(error))
    }
  }
}

import { UpdateStudentController } from '../../../Presentation/Controllers/Student/UpdateStudentController/UpdateStudentController'
import { UpdateStudentMySQLRepository } from '../../../Infra/Db/MySQL/Repository/Student/UpdateStudentMySQLRepository'
import { Controller } from '../../../Presentation/protocols'
import { makeUpdateStudentValidation } from './UpdateStudentValidationFactory'
import { CPFFormatterHelper } from '../../../Data/Helpers/CpfFormatterHelper'
import { DbUpdateStudent } from '../../../Data/UseCases/Student/UpdateStudent/DbUpdateStudent'

export const makeUpdateStudentController = (): Controller => {
  const cpfFormatterHelper = new CPFFormatterHelper()
  const updateStudentRepository = new UpdateStudentMySQLRepository(cpfFormatterHelper)
  const updateStudentUseCase = new DbUpdateStudent(updateStudentRepository)
  return new UpdateStudentController(updateStudentUseCase, makeUpdateStudentValidation())
}

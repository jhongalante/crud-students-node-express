import { CPFFormatterHelper } from '../../../Data/Helpers/CpfFormatterHelper'
import { Controller } from '../../../Presentation/protocols'
import { DeleteStudentMySQLRepository } from '../../../Infra/Db/MySQL/Repository/Student/DeleteStudentMySQLRepository'
import { DeleteStudentController } from '../../../Presentation/Controllers/Student/DeleteStudentController/DeleteStudentController'
import { makeDeleteStudentValidation } from './DeleteStudentValidationFactory'
import { DbDeleteStudent } from '../../../Data/UseCases/Student/DeleteStudent/DbDeleteStudent'

export const makeDeleteStudentController = (): Controller => {
  const cpfFormatterHelper = new CPFFormatterHelper()
  const deleteStudentRepository = new DeleteStudentMySQLRepository(cpfFormatterHelper)
  const deleteStudentUseCase = new DbDeleteStudent(deleteStudentRepository)
  return new DeleteStudentController(deleteStudentUseCase, makeDeleteStudentValidation())
}

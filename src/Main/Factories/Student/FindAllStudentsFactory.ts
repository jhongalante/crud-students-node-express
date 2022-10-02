import { FindAllStudentsController } from '../../../Presentation/Controllers/Student/FindAllStudentsController/FindAllStudentsController'
import { Controller } from '../../../Presentation/protocols'
import { FindAllStudentsMySQLRepository } from '../../../Infra/Db/MySQL/Repository/Student/FindAllStudentsMySQLRepository'
import { CPFFormatterHelper } from '../../../Data/Helpers/CpfFormatterHelper'
import { DbFindAllStudents } from '../../../Data/UseCases/Student/FindAllStudents/DbFindAllStudents'

export const makeFindAllStudentsController = (): Controller => {
  const cpfFormatterHelper = new CPFFormatterHelper()
  const findAllStudensRepository = new FindAllStudentsMySQLRepository(cpfFormatterHelper)
  const findAllStudentsUseCase = new DbFindAllStudents(findAllStudensRepository)
  return new FindAllStudentsController(findAllStudentsUseCase)
}

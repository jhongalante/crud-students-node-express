
import { CalculatePaginationHelper } from '../../../Data/Helpers/CalculatePaginationHelper'
import { Controller } from '../../../Presentation/protocols'
import { CPFFormatterHelper } from '../../../Data/Helpers/CpfFormatterHelper'
import { FindAllStudentsWithPaginateMySQLRepository } from '../../../Infra/Db/MySQL/Repository/Student/FindAllStudentsWithPaginateMySQLRepository'
import { FindAllStudentsWithPaginateController } from '../../../Presentation/Controllers/Student/FindAllStudentsWithPaginateController/FindAllStudentsWithPaginateController'
import { DbFindAllStudentsWithPaginate } from '../../../Data/UseCases/Student/FindAllStudentsWithPaginate/DbFindAllStudentsWithPaginate'

export const makeFindAllStudentsWithPaginateController = (): Controller => {
  const cpfFormatterHelper = new CPFFormatterHelper()
  const calculatePaginationHelper = new CalculatePaginationHelper()
  const findAllStudensRepository = new FindAllStudentsWithPaginateMySQLRepository(cpfFormatterHelper)
  const findAllStudentsUseCase = new DbFindAllStudentsWithPaginate(findAllStudensRepository, calculatePaginationHelper)
  return new FindAllStudentsWithPaginateController(findAllStudentsUseCase)
}

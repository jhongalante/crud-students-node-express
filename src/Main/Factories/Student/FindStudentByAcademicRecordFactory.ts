import { FindStudentByAcademicRecordMySQLRepository } from '../../../Infra/Db/MySQL/Repository/Student/FindStudentMySQLRepository'
import { Controller } from '../../../Presentation/protocols'
import { FindStudentByAcademicRecordController } from '../../../Presentation/Controllers/Student/FindStudentByAcademicRecordController/FindStudentByAcademicRecordController'
import { makeFindStudentByAcademicRecordValidation } from './FindStudentByAcademicRecordValidationFactory'
import { CPFFormatterHelper } from '../../../Data/Helpers/CpfFormatterHelper'
import { DbFindStudentByAcademicRecord } from '../../../Data/UseCases/Student/FindStudentByAcademicRecord/DbFindStudentByAcademicRecord'

export const makeFindStudentByAcademicRecordController = (): Controller => {
  const cpfFormatterHelper = new CPFFormatterHelper()
  const findStudentByAcademicRecordRepository = new FindStudentByAcademicRecordMySQLRepository(cpfFormatterHelper)
  const findStudentByAcademicRecordUseCase = new DbFindStudentByAcademicRecord(findStudentByAcademicRecordRepository)
  return new FindStudentByAcademicRecordController(findStudentByAcademicRecordUseCase, makeFindStudentByAcademicRecordValidation())
}

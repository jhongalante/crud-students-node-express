import { FindStudentByAcademicRecordMySQLRepository } from '../../../Infra/Db/MySQL/Repository/Student/FindStudentMySQLRepository'
import { DbAddStudent } from '../../../Data/UseCases/Student/AddStudent/DbAddStudent'
import { AddStudentMySQLRepository } from '../../../Infra/Db/MySQL/Repository/Student/AddStudentMySQLRepository'
import { RegisterStudentController } from '../../../Presentation/Controllers/Student/RegisterStudent/RegisterStudentController'
import { Controller } from '../../../Presentation/protocols'
import { makeRegisterStudentValidation } from './RegisterStudentValidationFactory'
import { CPFFormatterHelper } from '../../../Data/Helpers/CpfFormatterHelper'
import { DbFindStudentByAcademicRecord } from '../../../Data/UseCases/Student/FindStudentByAcademicRecord/DbFindStudentByAcademicRecord'

export const makeRegisterStudentController = (): Controller => {
  const cpfFormatterHelper = new CPFFormatterHelper()
  const addStudentRepository = new AddStudentMySQLRepository(cpfFormatterHelper)
  const addStudentUseCase = new DbAddStudent(addStudentRepository, cpfFormatterHelper)
  const findStudentRepository = new FindStudentByAcademicRecordMySQLRepository(cpfFormatterHelper)
  const findStudentUseCase = new DbFindStudentByAcademicRecord(findStudentRepository)
  return new RegisterStudentController(addStudentUseCase, findStudentUseCase, makeRegisterStudentValidation())
}

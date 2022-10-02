import { IFormatter } from '../../../Interfaces/Helpers/Formatter'
import { IStudentModel } from '../../../../Domain/Types'
import { IAddStudent } from '../../../../Domain/UseCases/Student/AddStudent'
import { IAddStudentRepository } from '../../../Interfaces/Db/Student/AddStudentRepository'

export class DbAddStudent implements IAddStudent {
  private readonly addStudentRepository: IAddStudentRepository
  private readonly cpfFormatter: IFormatter

  constructor (addStudentRepository: IAddStudentRepository, cpfFormatterHelper: IFormatter) {
    this.addStudentRepository = addStudentRepository
    this.cpfFormatter = cpfFormatterHelper
  }

  async add (student: IStudentModel): Promise<IStudentModel> {
    return await this.addStudentRepository.add({
      ...student,
      cpf: this.cpfFormatter.formatFrom(student.cpf)
    })
  }
}

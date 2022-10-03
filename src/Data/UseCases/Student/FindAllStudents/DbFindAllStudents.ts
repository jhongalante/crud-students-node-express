import { IStudentModel } from '../../../../Domain/Types'
import { IFindAllStudents } from '../../../../Domain/UseCases/Student/FindAllStudents'
import { IFindAllStudentsRepository } from '../../../Interfaces/Db/Student/FindAllStudentsRepository'

export class DbFindAllStudents implements IFindAllStudents {
  private readonly findAllStudentsRepository: IFindAllStudentsRepository

  constructor (findAllStudentsRepository: IFindAllStudentsRepository) {
    this.findAllStudentsRepository = findAllStudentsRepository
  }

  async findAll (): Promise<IStudentModel[]> {
    return await this.findAllStudentsRepository.findAll()
  }
}

import { IStudentModel } from '../../../Domain/Types/StudentModel'
import { IFindAllStudentsRepository } from '../../Interfaces/Db/student/FindAllStudentsRepository'
import { IFindAllStudents } from '../../../Domain/UseCases/FindAllStudents'

export class DbFindAllStudents implements IFindAllStudents {
  private readonly findAllStudentsRepository: IFindAllStudentsRepository

  constructor (findAllStudentsRepository: IFindAllStudentsRepository) {
    this.findAllStudentsRepository = findAllStudentsRepository
  }

  async findAll (): Promise<IStudentModel[]> {
    return await this.findAllStudentsRepository.findAll()
  }
}

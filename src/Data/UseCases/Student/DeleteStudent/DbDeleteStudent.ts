import { IDeleteStudentRepository } from '../../Interfaces/Db/student/DeleteStudentRepository'
import { IStudentModel } from '../../../Domain/Types/StudentModel'
import { IDeleteStudent } from '../../../Domain/UseCases/DeleteStudent'

export class DbDeleteStudent implements IDeleteStudent {
  private readonly deleteStudentRepository: IDeleteStudentRepository

  constructor (deleteStudentRepository: IDeleteStudentRepository) {
    this.deleteStudentRepository = deleteStudentRepository
  }

  async delete (academicRecord: string): Promise<IStudentModel> {
    return await this.deleteStudentRepository.delete(academicRecord)
  }
}

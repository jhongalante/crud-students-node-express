import { IStudentModel } from '../../../../Domain/Types'
import { IDeleteStudent } from '../../../../Domain/UseCases/Student/DeleteStudent'
import { IDeleteStudentRepository } from '../../../Interfaces/Db/Student/DeleteStudentRepository'

export class DbDeleteStudent implements IDeleteStudent {
  private readonly deleteStudentRepository: IDeleteStudentRepository

  constructor (deleteStudentRepository: IDeleteStudentRepository) {
    this.deleteStudentRepository = deleteStudentRepository
  }

  async delete (academicRecord: string): Promise<IStudentModel> {
    return await this.deleteStudentRepository.delete(academicRecord)
  }
}

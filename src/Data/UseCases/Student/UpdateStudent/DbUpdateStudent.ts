import { IStudentModel } from '../../../Domain/Types/StudentModel'
import { IUpdateStudentModel } from '../../../Domain/Types'
import { IUpdateStudent } from '../../../Domain/UseCases/UpdateStudent'
import { IUpdateStudentRepository } from '../../Interfaces/Db/student/UpdateStudentRepository'

export class DbUpdateStudent implements IUpdateStudent {
  private readonly updateStudentRepository: IUpdateStudentRepository

  constructor (updateStudentRepository: IUpdateStudentRepository) {
    this.updateStudentRepository = updateStudentRepository
  }

  async update (student: IUpdateStudentModel): Promise<IStudentModel> {
    return await this.updateStudentRepository.update({ ...student })
  }
}

import { IStudentModel, IUpdateStudentModel } from '../../../../Domain/Types'
import { IUpdateStudent } from '../../../../Domain/UseCases/Student/UpdateStudent'
import { IUpdateStudentRepository } from '../../../Interfaces/Db/Student/UpdateStudentRepository'

export class DbUpdateStudent implements IUpdateStudent {
  private readonly updateStudentRepository: IUpdateStudentRepository

  constructor (updateStudentRepository: IUpdateStudentRepository) {
    this.updateStudentRepository = updateStudentRepository
  }

  async update (student: IUpdateStudentModel): Promise<IStudentModel> {
    return await this.updateStudentRepository.update({ ...student })
  }
}

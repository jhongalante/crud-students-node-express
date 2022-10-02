import { IStudentModel } from '../../../../Domain/Types'

export interface IFindAllStudentsRepository {
  findAll (): Promise<IStudentModel[]>
}

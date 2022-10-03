import { IStudentModel } from '../../../../Domain/Types/Student/StudentModel'

export interface IFindAllStudentsRepository {
  findAll (): Promise<IStudentModel[]>
}

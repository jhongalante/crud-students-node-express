import { IStudentModel } from '../../../../Domain/Types/StudentModel'

export interface IDeleteStudentRepository {
  delete (academicRecord: string): Promise<IStudentModel>
}

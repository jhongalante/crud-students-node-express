import { IStudentModel } from '../../../../Domain/Types/Student/StudentModel'

export interface IDeleteStudentRepository {
  delete (academicRecord: string): Promise<IStudentModel>
}

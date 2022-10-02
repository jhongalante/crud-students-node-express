import { IStudentModel } from '../Types/StudentModel'

export interface IDeleteStudent {
  delete (academicRecord: string): Promise<IStudentModel>
}

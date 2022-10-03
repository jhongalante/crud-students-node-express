import { IStudentModel } from '../../../../Domain/Types/Student/StudentModel'

export interface IAddStudentRepository {
  add (student: IStudentModel): Promise<IStudentModel>
}

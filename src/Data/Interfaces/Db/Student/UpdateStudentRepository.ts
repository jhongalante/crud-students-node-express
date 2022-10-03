import { IStudentModel } from '../../../../Domain/Types/Student/StudentModel'
import { IUpdateStudentModel } from '../../../../Domain/Types/Student/UpdateStudentModel'

export interface IUpdateStudentRepository {
  update (student: IUpdateStudentModel): Promise<IStudentModel>
}

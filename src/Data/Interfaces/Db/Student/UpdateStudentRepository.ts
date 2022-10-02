import { IStudentModel } from '../../../../Domain/Types/StudentModel'
import { IUpdateStudentModel } from '../../../../Domain/Types'

export interface IUpdateStudentRepository {
  update (student: IUpdateStudentModel): Promise<IStudentModel>
}

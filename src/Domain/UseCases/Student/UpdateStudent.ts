import { IStudentModel } from '../Types/StudentModel'
import { IUpdateStudentModel } from '../Types'

export interface IUpdateStudent {
  update (student: IUpdateStudentModel): Promise<IStudentModel>
}

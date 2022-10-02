import { IStudentModel } from '../../Types'

export interface IAddStudent {
  add (student: IStudentModel): Promise<IStudentModel>
}

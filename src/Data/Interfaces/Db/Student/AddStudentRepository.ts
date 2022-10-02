import { IStudentModel } from '../../../../Domain/Types'

export interface IAddStudentRepository {
  add (student: IStudentModel): Promise<IStudentModel>
}

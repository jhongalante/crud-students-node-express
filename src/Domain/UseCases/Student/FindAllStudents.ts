import { IStudentModel } from '../Types'

export interface IFindAllStudents {
  findAll (): Promise<IStudentModel[]>
}

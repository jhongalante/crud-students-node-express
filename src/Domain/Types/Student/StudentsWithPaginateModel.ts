import { IStudentModel } from './StudentModel'
export interface IStudentWithPaginateModel {
  count: number
  rows: IStudentModel[]
}

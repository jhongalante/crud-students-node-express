import { IStudentWithPaginateModel } from '../Types/StudentsWithPaginateModel'

export interface IFindAllStudentsWithPaginate {
  findAllWithPaginate (page: number, size: number): Promise<IStudentWithPaginateModel>
}

import { IStudentWithPaginateModel } from '../../../../Domain/Types/Student/StudentsWithPaginateModel'

export interface IFindAllStudentsWithPaginateRepository {
  findAllWithPaginate (limit: number, offset: number): Promise<IStudentWithPaginateModel>
}

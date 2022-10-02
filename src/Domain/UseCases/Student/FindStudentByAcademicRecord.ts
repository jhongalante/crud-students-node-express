import { IStudentModel } from '../Types/StudentModel'

export interface IFindStudentByAcademicRecord {
  findByAcademicRecord (academicRecord: string): Promise<IStudentModel>
}

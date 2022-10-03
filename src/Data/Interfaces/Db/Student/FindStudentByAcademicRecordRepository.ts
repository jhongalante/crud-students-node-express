import { IStudentModel } from '../../../../Domain/Types/Student/StudentModel'

export interface IFindStudentByAcademicRecordRepository {
  findByAcademicRecord (academicRecord: string): Promise<IStudentModel>
}

import { IStudentModel } from '../../../../Domain/Types/StudentModel'

export interface IFindStudentByAcademicRecordRepository {
  findByAcademicRecord (academicRecord: string): Promise<IStudentModel>
}

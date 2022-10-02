import { IFindStudentByAcademicRecord } from '../../../Domain/UseCases/FindStudentByAcademicRecord'
import { IStudentModel } from '../../../Domain/Types/StudentModel'
import { IFindStudentByAcademicRecordRepository } from '../../Interfaces/Db/student/FindStudentByAcademicRecordRepository'

export class DbFindStudentByAcademicRecord implements IFindStudentByAcademicRecord {
  private readonly findStudentByAcademicRecordRepository: IFindStudentByAcademicRecordRepository

  constructor (findStudentByAcademicRecordRepository: IFindStudentByAcademicRecordRepository) {
    this.findStudentByAcademicRecordRepository = findStudentByAcademicRecordRepository
  }

  async findByAcademicRecord (academicRecord: string): Promise<IStudentModel> {
    return await this.findStudentByAcademicRecordRepository.findByAcademicRecord(academicRecord)
  }
}

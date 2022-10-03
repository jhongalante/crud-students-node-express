import { IStudentModel } from '../../../../Domain/Types'
import { IFindStudentByAcademicRecord } from '../../../../Domain/UseCases/Student/FindStudentByAcademicRecord'
import { IFindStudentByAcademicRecordRepository } from '../../../Interfaces/Db/Student/FindStudentByAcademicRecordRepository'

export class DbFindStudentByAcademicRecord implements IFindStudentByAcademicRecord {
  private readonly findStudentByAcademicRecordRepository: IFindStudentByAcademicRecordRepository

  constructor (findStudentByAcademicRecordRepository: IFindStudentByAcademicRecordRepository) {
    this.findStudentByAcademicRecordRepository = findStudentByAcademicRecordRepository
  }

  async findByAcademicRecord (academicRecord: string): Promise<IStudentModel> {
    return await this.findStudentByAcademicRecordRepository.findByAcademicRecord(academicRecord)
  }
}

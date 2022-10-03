import { IFormatter } from '../../../../../Data/Interfaces/Helpers/Formatter'
import { IStudentModel } from '../../../../../Domain/Types'
import { StudentModel } from '../../../../../Domain/Models'
import { IFindStudentByAcademicRecordRepository } from '../../../../../Data/Interfaces/Db/Student/FindStudentByAcademicRecordRepository'

export class FindStudentByAcademicRecordMySQLRepository implements IFindStudentByAcademicRecordRepository {
  constructor (private readonly cpfFormatterHelper: IFormatter) {
  }

  async findByAcademicRecord (academicRecord: string): Promise<IStudentModel> {
    try {
      const findedStudent = await StudentModel.findByPk(academicRecord)

      if (!findedStudent) {
        throw new Error(`FindStudentByAcademicRecordRepository: aluno com RA: ${academicRecord} não encontrado`)
      }

      return {
        name: findedStudent.get('name') as string,
        email: findedStudent.get('email') as string,
        cpf: this.cpfFormatterHelper.formatTo(findedStudent.get('cpf') as string),
        academicRecord: findedStudent.get('academicRecord') as string
      }
    } catch (error) {
      console.error(error)
      return null
    }
  }
}

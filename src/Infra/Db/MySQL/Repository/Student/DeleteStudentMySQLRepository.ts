import { IFormatter } from '../../../../../Data/Interfaces/Helpers/Formatter'
import { IStudentModel } from '../../../../../Domain/Types/StudentModel'
import { StudentModel } from '../../../../../Domain/Models'
import { IDeleteStudentRepository } from '../../../../../Data/Interfaces/Db/Student/DeleteStudentRepository'

export class DeleteStudentMySQLRepository implements IDeleteStudentRepository {
  constructor (private readonly cpfFormatterHelper: IFormatter) {
  }

  async delete (academicRecord: string): Promise<IStudentModel> {
    try {
      const deletedStudent = await StudentModel.findByPk(academicRecord)
      if (!deletedStudent) {
        throw new Error(`DeleteStudentRepository: aluno com RA: ${academicRecord} não encontrado`)
      }
      await deletedStudent.destroy()

      return {
        name: deletedStudent.get('name') as string,
        email: deletedStudent.get('email') as string,
        cpf: this.cpfFormatterHelper.formatTo(deletedStudent.get('cpf') as string),
        academicRecord: deletedStudent.get('academicRecord') as string
      }
    } catch (error) {
      console.error(error)
      return null
    }
  }
}

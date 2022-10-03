import { IFormatter } from '../../../../../Data/Interfaces/Helpers/Formatter'
import { IUpdateStudentRepository } from '../../../../../Data/Interfaces/Db/Student/UpdateStudentRepository'
import { StudentModel } from '../../../../../Domain/Models'
import { IStudentModel, IUpdateStudentModel } from '../../../../../Domain/Types'

export class UpdateStudentMySQLRepository implements IUpdateStudentRepository {
  constructor (private readonly cpfFormatterHelper: IFormatter) {
  }

  async update (student: IUpdateStudentModel): Promise<IStudentModel> {
    try {
      const updatedStudent = await StudentModel.findByPk(student.academicRecord)
      if (!updatedStudent) {
        throw new Error(`UpdateStudentRepository: aluno com RA: ${student.academicRecord} não encontrado`)
      }
      updatedStudent.set('name', student.name)
      updatedStudent.set('email', student.email)
      const result = await updatedStudent.save()

      return {
        name: result.get('name') as string,
        email: result.get('email') as string,
        cpf: this.cpfFormatterHelper.formatTo(result.get('cpf') as string),
        academicRecord: result.get('academicRecord') as string
      }
    } catch (error) {
      console.error(error)
      return null
    }
  }
}

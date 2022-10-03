import { IFormatter } from '../../../../../Data/Interfaces/Helpers/Formatter'
import { StudentModel } from '../../../../../Domain/Models'
import { IFindAllStudentsRepository } from '../../../../../Data/Interfaces/Db/Student/FindAllStudentsRepository'
import { IStudentModel } from '../../../../../Domain/Types/Student/StudentModel'

export class FindAllStudentsMySQLRepository implements IFindAllStudentsRepository {
  constructor (private readonly cpfFormatterHelper: IFormatter) {
  }

  async findAll (): Promise<IStudentModel[]> {
    try {
      const findedStudent = await StudentModel.findAll()

      if (!findedStudent.length) {
        throw new Error('FindAllStudentsMySQLRepository: Nenhum aluno encontrado')
      }

      return findedStudent.map((student) => {
        return {
          name: student.get('name') as string,
          email: student.get('email') as string,
          cpf: this.cpfFormatterHelper.formatTo(student.get('cpf') as string),
          academicRecord: student.get('academicRecord') as string
        }
      })
    } catch (error) {
      console.error(error)
      return null
    }
  }
}

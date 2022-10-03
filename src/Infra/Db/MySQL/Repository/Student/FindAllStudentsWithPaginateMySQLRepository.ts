import { IFormatter } from '../../../../../Data/Interfaces/Helpers/Formatter'
import { StudentModel } from '../../../../../Domain/Models'
import { IFindAllStudentsWithPaginateRepository } from '../../../../../Data/Interfaces/Db/Student/FindAllStudentsWithPaginateRepository'
import { IStudentWithPaginateModel } from '../../../../../Domain/Types/Student/StudentsWithPaginateModel'
import { IStudentModel } from '../../../../../Domain/Types/Student/StudentModel'

export class FindAllStudentsWithPaginateMySQLRepository implements IFindAllStudentsWithPaginateRepository {
  constructor (private readonly cpfFormatterHelper: IFormatter) {
  }

  async findAllWithPaginate (limit: number, offset: number): Promise<IStudentWithPaginateModel> {
    try {
      const findedStudents = await StudentModel.findAndCountAll({ limit, offset })

      if (!findedStudents.count) {
        throw new Error('FindAllStudentsMySQLRepository: Nenhum aluno encontrado')
      }

      const adaptedStudents = findedStudents.rows.map((student): IStudentModel => {
        return {
          name: student.get('name') as string,
          email: student.get('email') as string,
          cpf: this.cpfFormatterHelper.formatTo(student.get('cpf') as string),
          academicRecord: student.get('academicRecord') as string
        }
      })
      return {
        count: findedStudents.count,
        rows: adaptedStudents
      }
    } catch (error) {
      console.error(error)
      return null
    }
  }
}

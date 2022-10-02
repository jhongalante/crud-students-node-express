import { IFormatter } from '../../../../../Data/Interfaces/Helpers/Formatter'
import { IAddStudentRepository } from '../../../../../Data/Interfaces/Db/Student/AddStudentRepository'
import { StudentModel } from '../../../../../Domain/Models'
import { IStudentModel } from '../../../../../Domain/Types'

export class AddStudentMySQLRepository implements IAddStudentRepository {
  constructor (private readonly cpfFormatterHelper: IFormatter) {
  }

  async add (student: IStudentModel): Promise<IStudentModel> {
    try {
      const createdStudent = await StudentModel.create({ ...student })
      return {
        name: createdStudent.get('name') as string,
        email: createdStudent.get('email') as string,
        cpf: this.cpfFormatterHelper.formatTo(createdStudent.get('cpf') as string),
        academicRecord: createdStudent.get('academicRecord') as string
      }
    } catch (error) {
      return error
    }
  }
}

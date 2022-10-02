import { IStudentModel } from '../../../Domain/Types/StudentModel'
import { IFindAllStudents } from '../../../Domain/UseCases/FindAllStudents'
import { IFindAllStudentsRepository } from '../../Interfaces/Db/student/FindAllStudentsRepository'
import { DbFindAllStudents } from './DbFindAllStudents'

describe('DbFindAllStudents', () => {
  const makeFindAllStudentsMock = (): IStudentModel[] => ([
    {
      name: 'valid_name',
      cpf: '555.555.555-55',
      email: 'valid_email@teste.com',
      academicRecord: '123456'
    },
    {
      name: 'valid_name2',
      cpf: '666.666.666-66',
      email: 'valid_email@teste.com',
      academicRecord: '654321'
    }
  ])

  const makeFindAllStudentsRepository = (): IFindAllStudentsRepository => {
    class FindAllStudentsRepositoryStub implements IFindAllStudentsRepository {
      async findAll (): Promise<IStudentModel[]> {
        const fakeAllStudentsModel = makeFindAllStudentsMock()
        return await new Promise(resolve => resolve(fakeAllStudentsModel))
      }
    }
    return new FindAllStudentsRepositoryStub()
  }

  interface SubTypes {
    sut: IFindAllStudents
    findAllStudentsRepositoryStub: IFindAllStudentsRepository
  }

  const makeSut = (): SubTypes => {
    const findAllStudentsRepositoryStub = makeFindAllStudentsRepository()
    const sut = new DbFindAllStudents(findAllStudentsRepositoryStub)
    return {
      sut,
      findAllStudentsRepositoryStub
    }
  }

  it('Should throw error if repository throws it', async () => {
    const { sut, findAllStudentsRepositoryStub } = makeSut()
    jest.spyOn(findAllStudentsRepositoryStub, 'findAll').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))

    const promise = sut.findAll()

    await expect(promise).rejects.toThrow()
  })

  it('Should return a list of students', async () => {
    const { sut } = makeSut()
    const findAllStudentsMock = makeFindAllStudentsMock()

    const result = await sut.findAll()

    expect(result).toEqual(findAllStudentsMock)
  })
})

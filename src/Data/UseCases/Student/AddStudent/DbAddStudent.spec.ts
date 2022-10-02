import { DbAddStudent } from './DbAddStudent'
import { IAddStudentRepository } from '../../../Interfaces/Db/Student/AddStudentRepository'
import { IStudentModel } from '../../../../Domain/Types/StudentModel'
import { IFormatter } from '../../../Interfaces/Helpers/Formatter'
import { IAddStudent } from '../../../../Domain/UseCases/Student/AddStudent'

describe('DbAddStudent', () => {
  const makeAddStudentMock = (): IStudentModel => ({
    name: 'valid_name',
    email: 'valid-email@teste.com',
    cpf: '555.555.555-55',
    academicRecord: '123456'
  })

  const makeCPFFormatterHelper = (): IFormatter => {
    class CPFFormatterHelperStub implements IFormatter {
      formatFrom (cpf: string): string {
        return '555.555.555-55'
      }

      formatTo (cpf: string): string {
        return '55555555555'
      }
    }
    return new CPFFormatterHelperStub()
  }

  const makeAddStudentRepository = (): IAddStudentRepository => {
    class AddStudentRepositoryStub implements IAddStudentRepository {
      async add (student: IStudentModel): Promise<IStudentModel> {
        const fakeStudentModel = makeAddStudentMock()
        return await new Promise(resolve => resolve(fakeStudentModel))
      }
    }
    return new AddStudentRepositoryStub()
  }

  interface SubTypes {
    sut: IAddStudent
    addStudentRepositoryStub: IAddStudentRepository
    cpfFormatterHelperStub: IFormatter
  }

  const makeSut = (): SubTypes => {
    const cpfFormatterHelperStub = makeCPFFormatterHelper()
    const addStudentRepositoryStub = makeAddStudentRepository()
    const sut = new DbAddStudent(addStudentRepositoryStub, cpfFormatterHelperStub)
    return {
      sut,
      addStudentRepositoryStub,
      cpfFormatterHelperStub
    }
  }

  it('Should add student repository', async () => {
    const { sut, addStudentRepositoryStub } = makeSut()
    const addSpyRepository = jest.spyOn(addStudentRepositoryStub, 'add')
    const addStudentMock = makeAddStudentMock()

    await sut.add(addStudentMock)

    expect(addSpyRepository).toHaveBeenLastCalledWith({
      name: 'valid_name',
      email: 'valid-email@teste.com',
      cpf: '555.555.555-55',
      academicRecord: '123456'
    })
  })

  it('Should throw error if repository throws it', async () => {
    const { sut, addStudentRepositoryStub } = makeSut()
    jest.spyOn(addStudentRepositoryStub, 'add').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const addStudentMock = makeAddStudentMock()

    const promise = sut.add(addStudentMock)

    await expect(promise).rejects.toThrow()
  })

  it('Should return a student', async () => {
    const { sut } = makeSut()
    const addStudentMock = makeAddStudentMock()

    const result = await sut.add(addStudentMock)

    expect(result).toEqual(makeAddStudentMock())
  })

  it('Should call formatFrom from cpf formatter', async () => {
    const { sut, cpfFormatterHelperStub } = makeSut()
    const addSpyRepository = jest.spyOn(cpfFormatterHelperStub, 'formatFrom')
    const addStudentMock = makeAddStudentMock()

    await sut.add(addStudentMock)

    expect(addSpyRepository).toHaveBeenLastCalledWith('555.555.555-55')
  })
})

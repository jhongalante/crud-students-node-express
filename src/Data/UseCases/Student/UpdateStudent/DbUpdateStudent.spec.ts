import { IStudentModel, IUpdateStudentModel } from '../../../../Domain/Types'
import { IUpdateStudent } from '../../../../Domain/UseCases/Student/UpdateStudent'
import { IUpdateStudentRepository } from '../../../Interfaces/Db/Student/UpdateStudentRepository'
import { DbUpdateStudent } from './DbUpdateStudent'

describe('DbUpdateStudent', () => {
  const makeUpdateStudentMock = (): IStudentModel => ({
    name: 'valid_name',
    email: 'valid-email@teste.com',
    cpf: '555.555.555-55',
    academicRecord: '123456'
  })

  const makeUpdateStudentRepository = (): IUpdateStudentRepository => {
    class UpdateStudentRepositoryStub implements IUpdateStudentRepository {
      async update (student: IUpdateStudentModel): Promise<IStudentModel> {
        const fakeUpdatedStudentModel = makeUpdateStudentMock()
        return await new Promise(resolve => resolve(fakeUpdatedStudentModel))
      }
    }
    return new UpdateStudentRepositoryStub()
  }

  interface SubTypes {
    sut: IUpdateStudent
    updateStudentRepositoryStub: IUpdateStudentRepository
  }

  const makeSut = (): SubTypes => {
    const updateStudentRepositoryStub = makeUpdateStudentRepository()
    const sut = new DbUpdateStudent(updateStudentRepositoryStub)
    return {
      sut,
      updateStudentRepositoryStub
    }
  }

  it('Should update student repository', async () => {
    const { sut, updateStudentRepositoryStub } = makeSut()
    const updateSpyRepository = jest.spyOn(updateStudentRepositoryStub, 'update')
    const updateStudentMock = makeUpdateStudentMock()

    await sut.update(updateStudentMock)

    expect(updateSpyRepository).toHaveBeenLastCalledWith({
      name: 'valid_name',
      email: 'valid-email@teste.com',
      cpf: '555.555.555-55',
      academicRecord: '123456'
    })
  })

  it('Should throw error if repository throws it', async () => {
    const { sut, updateStudentRepositoryStub } = makeSut()
    jest.spyOn(updateStudentRepositoryStub, 'update').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const updateStudentMock = makeUpdateStudentMock()

    const promise = sut.update(updateStudentMock)

    await expect(promise).rejects.toThrow()
  })

  it('Should return a student', async () => {
    const { sut } = makeSut()
    const updateStudentMock = makeUpdateStudentMock()

    const result = await sut.update(updateStudentMock)

    expect(result).toEqual(makeUpdateStudentMock())
  })
})

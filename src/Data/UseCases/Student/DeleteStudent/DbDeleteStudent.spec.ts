import { IStudentModel } from '../../../../Domain/Types'
import { IDeleteStudent } from '../../../../Domain/UseCases/Student/DeleteStudent'
import { IDeleteStudentRepository } from '../../../Interfaces/Db/Student/DeleteStudentRepository'
import { DbDeleteStudent } from './DbDeleteStudent'

describe('DbDeleteStudent', () => {
  const makeDeleteStudentMock = (): IStudentModel => ({
    name: 'valid_name',
    email: 'valid-email@teste.com',
    cpf: '555.555.555-55',
    academicRecord: '123456'
  })

  const makeDeleteStudentRepository = (): IDeleteStudentRepository => {
    class DeleteStudentRepositoryStub implements IDeleteStudentRepository {
      async delete (academicRecord: string): Promise<IStudentModel> {
        const fakeDeletedStudentModel = makeDeleteStudentMock()
        return await new Promise(resolve => resolve(fakeDeletedStudentModel))
      }
    }
    return new DeleteStudentRepositoryStub()
  }

  interface SubTypes {
    sut: IDeleteStudent
    deleteStudentRepositoryStub: IDeleteStudentRepository
  }

  const makeSut = (): SubTypes => {
    const deleteStudentRepositoryStub = makeDeleteStudentRepository()
    const sut = new DbDeleteStudent(deleteStudentRepositoryStub)
    return {
      sut,
      deleteStudentRepositoryStub
    }
  }

  it('Should delete student repository', async () => {
    const { sut, deleteStudentRepositoryStub } = makeSut()
    const deleteSpyRepository = jest.spyOn(deleteStudentRepositoryStub, 'delete')

    await sut.delete('123456')

    expect(deleteSpyRepository).toHaveBeenLastCalledWith('123456')
  })

  it('Should throw error if repository throws it', async () => {
    const { sut, deleteStudentRepositoryStub } = makeSut()
    jest.spyOn(deleteStudentRepositoryStub, 'delete').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))

    const promise = sut.delete('123456')

    await expect(promise).rejects.toThrow()
  })

  it('Should delete a student', async () => {
    const { sut } = makeSut()
    const deleteStudentMock = makeDeleteStudentMock()

    const result = await sut.delete('123456')

    expect(result).toEqual(deleteStudentMock)
  })
})

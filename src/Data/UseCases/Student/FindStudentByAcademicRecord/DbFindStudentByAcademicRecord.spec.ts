import { IStudentModel } from '../../../../Domain/Types'
import { IFindStudentByAcademicRecord } from '../../../../Domain/UseCases/Student/FindStudentByAcademicRecord'
import { IFindStudentByAcademicRecordRepository } from '../../../Interfaces/Db/Student/FindStudentByAcademicRecordRepository'
import { DbFindStudentByAcademicRecord } from './DbFindStudentByAcademicRecord'

describe('DbFindStudentByAcademicRecord', () => {
  const makeFindStudentByAcademicRecordMock = (): IStudentModel => ({
    name: 'valid_name',
    email: 'valid-email@teste.com',
    cpf: '555.555.555-55',
    academicRecord: '123456'
  })

  const makeFindStudentByAcademicRecordRepository = (): IFindStudentByAcademicRecordRepository => {
    class FindStudentByAcademicRecordRepositoryStub implements IFindStudentByAcademicRecordRepository {
      async findByAcademicRecord (academicRecord: string): Promise<IStudentModel> {
        const fakeFindedStudentModel = makeFindStudentByAcademicRecordMock()
        return await new Promise(resolve => resolve(fakeFindedStudentModel))
      }
    }
    return new FindStudentByAcademicRecordRepositoryStub()
  }

  interface SubTypes {
    sut: IFindStudentByAcademicRecord
    findStudentByAcademicRecordRepositoryStub: IFindStudentByAcademicRecordRepository
  }

  const makeSut = (): SubTypes => {
    const findStudentByAcademicRecordRepositoryStub = makeFindStudentByAcademicRecordRepository()
    const sut = new DbFindStudentByAcademicRecord(findStudentByAcademicRecordRepositoryStub)
    return {
      sut,
      findStudentByAcademicRecordRepositoryStub
    }
  }

  it('Should find student by academic record repository', async () => {
    const { sut, findStudentByAcademicRecordRepositoryStub } = makeSut()
    const findByAcademicRecordSpyRepository = jest.spyOn(findStudentByAcademicRecordRepositoryStub, 'findByAcademicRecord')

    await sut.findByAcademicRecord('123456')

    expect(findByAcademicRecordSpyRepository).toHaveBeenLastCalledWith('123456')
  })

  it('Should throw error if repository throws it', async () => {
    const { sut, findStudentByAcademicRecordRepositoryStub } = makeSut()
    jest.spyOn(findStudentByAcademicRecordRepositoryStub, 'findByAcademicRecord').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))

    const promise = sut.findByAcademicRecord('123456')

    await expect(promise).rejects.toThrow()
  })

  it('Should find a student by academic record', async () => {
    const { sut } = makeSut()
    const findStudentByAcademicRecordMock = makeFindStudentByAcademicRecordMock()

    const result = await sut.findByAcademicRecord('123456')

    expect(result).toEqual(findStudentByAcademicRecordMock)
  })
})

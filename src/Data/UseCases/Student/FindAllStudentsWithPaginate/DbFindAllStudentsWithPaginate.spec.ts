import { ICalculatePaginationHelperModel, IStudentWithPaginateModel } from '../../../../Domain/Types'
import { IFindAllStudentsWithPaginate } from '../../../../Domain/UseCases/Student/FindAllStudentsWithPaginate'
import { IFindAllStudentsWithPaginateRepository } from '../../../Interfaces/Db/Student/FindAllStudentsWithPaginateRepository'
import { ICalculatePaginationHelper } from '../../../Interfaces/Helpers/CalculatePaginationHelper'
import { DbFindAllStudentsWithPaginate } from './DbFindAllStudentsWithPaginate'

describe('DbFindAllStudentsWithPaginate', () => {
  const makeFindAllStudentsWithPaginateMock = (): IStudentWithPaginateModel => ({
    count: 2,
    rows: [
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
      }]
  })

  const makeFindAllStudentsWithPaginateRepository = (): IFindAllStudentsWithPaginateRepository => {
    class FindAllStudentsWithPaginateRepositoryStub implements IFindAllStudentsWithPaginateRepository {
      async findAllWithPaginate (_limit: number, _offset: number): Promise<IStudentWithPaginateModel> {
        const fakeAllStudentsModel = makeFindAllStudentsWithPaginateMock()
        return await new Promise(resolve => resolve(fakeAllStudentsModel))
      }
    }
    return new FindAllStudentsWithPaginateRepositoryStub()
  }

  const makeCalculatePaginationHelper = (): ICalculatePaginationHelper => {
    class CalculatePaginationHelperStub implements ICalculatePaginationHelper {
      calculatePagination (page: number, size: number): ICalculatePaginationHelperModel {
        return {
          limit: 2,
          offset: 0
        }
      }
    }
    return new CalculatePaginationHelperStub()
  }

  interface SubTypes {
    sut: IFindAllStudentsWithPaginate
    calculatePaginationHelper: ICalculatePaginationHelper
    findAllStudentsWithPaginateRepositoryStub: IFindAllStudentsWithPaginateRepository
  }

  const makeSut = (): SubTypes => {
    const findAllStudentsWithPaginateRepositoryStub = makeFindAllStudentsWithPaginateRepository()
    const calculatePaginationHelper = makeCalculatePaginationHelper()
    const sut = new DbFindAllStudentsWithPaginate(findAllStudentsWithPaginateRepositoryStub, calculatePaginationHelper)
    return {
      sut,
      calculatePaginationHelper,
      findAllStudentsWithPaginateRepositoryStub
    }
  }

  it('Should throw error if repository throws it', async () => {
    const { sut, findAllStudentsWithPaginateRepositoryStub } = makeSut()
    jest.spyOn(findAllStudentsWithPaginateRepositoryStub, 'findAllWithPaginate').mockReturnValueOnce(new Promise((_resolve, reject) => reject(new Error())))

    const promise = sut.findAllWithPaginate(2, 0)

    await expect(promise).rejects.toThrow()
  })

  it('Should return a list of students', async () => {
    const { sut } = makeSut()
    const findAllStudentsWithPaginateMock = makeFindAllStudentsWithPaginateMock()

    const result = await sut.findAllWithPaginate(2, 0)

    expect(result).toEqual(findAllStudentsWithPaginateMock)
  })
})

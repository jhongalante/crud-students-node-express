import { IFindAllStudentsWithPaginate } from '../../../../Domain/UseCases/Student/FindAllStudentsWithPaginate'
import { IStudentWithPaginateModel } from '../../../../Domain/Types/Student/StudentsWithPaginateModel'
import { ok, internalServerError } from '../../../Helpers/Http/HttpHelpers'
import { ServerError } from '../../../Errors'
import { HttpRequest } from '../../../protocols'
import { FindAllStudentsWithPaginateController } from './FindAllStudentsWithPaginateController'

const makeRequestMock = (): HttpRequest => ({
  query: {
    page: 2,
    size: 1
  }
})

const makeAllStudentsWithPaginateModelMock = (): IStudentWithPaginateModel => ({
  count: 2,
  rows: [
    {
      name: 'valid_name',
      email: 'valid@email.com',
      cpf: '555.555.555-55',
      academicRecord: '123456'
    },
    {
      name: 'valid_name2',
      email: 'valid2@email.com',
      cpf: '666.666.666-66',
      academicRecord: '654321'
    }
  ]
})

const makeFindAllStudentsWithPaginateUseCase = (): IFindAllStudentsWithPaginate => {
  class FindAllStudentsWithPaginateUseCaseStub implements IFindAllStudentsWithPaginate {
    async findAllWithPaginate (page: number, size: number): Promise<IStudentWithPaginateModel> {
      const allStudentsModelMock = makeAllStudentsWithPaginateModelMock()
      return await new Promise(resolve => resolve(allStudentsModelMock))
    }
  }
  return new FindAllStudentsWithPaginateUseCaseStub()
}

interface SubTypes {
  sut: FindAllStudentsWithPaginateController
  findAllStudentsWithPaginateUseCaseStub: IFindAllStudentsWithPaginate
}

const makeSut = (): SubTypes => {
  const findAllStudentsWithPaginateUseCaseStub = makeFindAllStudentsWithPaginateUseCase()
  const sut = new FindAllStudentsWithPaginateController(findAllStudentsWithPaginateUseCaseStub)
  return {
    sut,
    findAllStudentsWithPaginateUseCaseStub
  }
}

describe('FindAllStudentsController', () => {
  it('Should return 200 when success', async () => {
    const { sut } = makeSut()
    const httpRequest = makeRequestMock()

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toEqual(ok(makeAllStudentsWithPaginateModelMock()))
  })

  it('Should return 500 FindStudentByAcademicRecordUseCase.FindByAcademicRecord throws', async () => {
    const { sut, findAllStudentsWithPaginateUseCaseStub } = makeSut()
    jest.spyOn(findAllStudentsWithPaginateUseCaseStub, 'findAllWithPaginate').mockImplementationOnce(() => {
      throw new ServerError(new Error())
    })
    const httpRequest = makeRequestMock()

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toEqual(internalServerError(new Error('')))
  })
})

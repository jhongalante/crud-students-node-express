import { FindAllStudentsController } from './FindAllStudentsController'
import { IFindAllStudents } from '../../../../Domain/UseCases/Student/FindAllStudents'
import { IStudentModel } from '../../../../Domain/Types'
import { ok, internalServerError } from '../../../Helpers/Http/HttpHelpers'
import { ServerError } from '../../../Errors'
import { HttpRequest } from '../../../protocols'

const makeRequestMock = (): HttpRequest => ({
  body: {}
})

const makeAllStudentsModelMock = (): IStudentModel[] => ([
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
])

const makeFindAllStudentsUseCase = (): IFindAllStudents => {
  class FindAllStudentsUseCaseStub implements IFindAllStudents {
    async findAll (): Promise<IStudentModel[]> {
      const allStudentsModelMock = makeAllStudentsModelMock()
      return await new Promise(resolve => resolve(allStudentsModelMock))
    }
  }
  return new FindAllStudentsUseCaseStub()
}

interface SubTypes {
  sut: FindAllStudentsController
  findAllStudentsUseCaseStub: IFindAllStudents
}

const makeSut = (): SubTypes => {
  const findAllStudentsUseCaseStub = makeFindAllStudentsUseCase()
  const sut = new FindAllStudentsController(findAllStudentsUseCaseStub)
  return {
    sut,
    findAllStudentsUseCaseStub
  }
}

describe('FindAllStudentsController', () => {
  it('Should return 200 when success', async () => {
    const { sut } = makeSut()
    const httpRequest = makeRequestMock()

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toEqual(ok(makeAllStudentsModelMock()))
  })

  it('Should return 500 FindStudentByAcademicRecordUseCase.FindByAcademicRecord throws', async () => {
    const { sut, findAllStudentsUseCaseStub } = makeSut()
    jest.spyOn(findAllStudentsUseCaseStub, 'findAll').mockImplementationOnce(() => {
      throw new ServerError(new Error())
    })
    const httpRequest = makeRequestMock()

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toEqual(internalServerError(new Error('')))
  })
})

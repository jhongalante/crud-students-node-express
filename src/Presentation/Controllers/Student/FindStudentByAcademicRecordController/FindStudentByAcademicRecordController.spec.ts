import { FindStudentByAcademicRecordController } from './FindStudentByAcademicRecordController'
import { IFindStudentByAcademicRecord } from '../../../../Domain/UseCases/FindStudentByAcademicRecord'
import { IStudentModel } from '../../../../Domain/Types/StudentModel'
import { HttpRequest } from '../../../protocols'
import { Validation } from '../../../protocols/Validation'
import { badRequest, ok, internalServerError } from '../../../Helpers/Http/HttpHelpers'
import { RequiredFieldError, ServerError } from '../../../Errors'

const makeRequestMock = (): HttpRequest => ({
  params: {
    academicRecord: '123456'
  }
})

const makeStudentModelMock = (): IStudentModel => ({
  name: 'valid_name',
  email: 'valid@email.com',
  cpf: '555.555.555-55',
  academicRecord: '123456'
})

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (_input: any): Error {
      return null
    }
  }
  return new ValidationStub()
}

const makeFindStudentByAcademicRecordUseCase = (): IFindStudentByAcademicRecord => {
  class FindStudentByAcademicRecordUseCaseStub implements IFindStudentByAcademicRecord {
    async findByAcademicRecord (academicRecord: string): Promise<IStudentModel> {
      const studentModelMock = makeStudentModelMock()
      return await new Promise(resolve => resolve(studentModelMock))
    }
  }
  return new FindStudentByAcademicRecordUseCaseStub()
}

interface SubTypes {
  sut: FindStudentByAcademicRecordController
  validationStub: Validation
  findStudentByAcademicRecordUseCaseStub: IFindStudentByAcademicRecord
}

const makeSut = (): SubTypes => {
  const findStudentByAcademicRecordUseCaseStub = makeFindStudentByAcademicRecordUseCase()
  const validationStub = makeValidation()
  const sut = new FindStudentByAcademicRecordController(findStudentByAcademicRecordUseCaseStub, validationStub)
  return {
    sut,
    findStudentByAcademicRecordUseCaseStub,
    validationStub
  }
}

describe('FindStudentByAcademicRecordController', () => {
  it('Should call FindStudentByAcademicRecord with correct values', async () => {
    const { sut, findStudentByAcademicRecordUseCaseStub } = makeSut()
    const findStudentSpy = jest.spyOn(findStudentByAcademicRecordUseCaseStub, 'findByAcademicRecord')
    const httpRequest = makeRequestMock()

    await sut.handle(httpRequest)

    expect(findStudentSpy).toHaveBeenCalledWith('123456')
  })

  it('Should return 200 when success', async () => {
    const { sut } = makeSut()
    const httpRequest = makeRequestMock()

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toEqual(ok(makeStudentModelMock()))
  })

  it('Should return 500 FindStudentByAcademicRecordUseCase.FindByAcademicRecord throws', async () => {
    const { sut, findStudentByAcademicRecordUseCaseStub } = makeSut()
    jest.spyOn(findStudentByAcademicRecordUseCaseStub, 'findByAcademicRecord').mockImplementationOnce(() => {
      throw new ServerError(new Error())
    })
    const httpRequest = makeRequestMock()

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toEqual(internalServerError(new Error('')))
  })

  it('Should call validation with correct value', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    const httpRequest = makeRequestMock()

    await sut.handle(httpRequest)

    expect(validateSpy).toHaveBeenCalledWith(httpRequest.params)
  })

  it('Should return 400 if validation returns an error', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new RequiredFieldError('any_field'))
    const httpRequest = makeRequestMock()

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toEqual(badRequest(new RequiredFieldError('any_field')))
  })
})

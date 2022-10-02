import { UpdateStudentController } from './UpdateStudentController'
import { IStudentModel } from '../../../../Domain/Types/StudentModel'
import { HttpRequest } from '../../../protocols'
import { Validation } from '../../../protocols/Validation'
import { badRequest, ok, internalServerError } from '../../../Helpers/Http/HttpHelpers'
import { RequiredFieldError, ServerError } from '../../../Errors'
import { IUpdateStudent } from '../../../../Domain/UseCases/UpdateStudent'
import { IUpdateStudentModel } from '../../../../Domain/Types'

const makeRequestMock = (): HttpRequest => ({
  body: {
    name: 'valid_name',
    email: 'valid@email.com'
  },
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

const makeUpdateStudentUseCase = (): IUpdateStudent => {
  class UpdateStudentUseCaseStub implements IUpdateStudent {
    async update (student: IUpdateStudentModel): Promise<IStudentModel> {
      const studentModelMock = makeStudentModelMock()
      return await new Promise(resolve => resolve(studentModelMock))
    }
  }
  return new UpdateStudentUseCaseStub()
}

interface SubTypes {
  sut: UpdateStudentController
  validationStub: Validation
  updateStudentUseCaseStub: IUpdateStudent
}

const makeSut = (): SubTypes => {
  const updateStudentUseCaseStub = makeUpdateStudentUseCase()
  const validationStub = makeValidation()
  const sut = new UpdateStudentController(updateStudentUseCaseStub, validationStub)
  return {
    sut,
    updateStudentUseCaseStub,
    validationStub
  }
}

describe('UpdateStudentController', () => {
  it('Should call UpdateStudent with correct values', async () => {
    const { sut, updateStudentUseCaseStub } = makeSut()
    const updateSpy = jest.spyOn(updateStudentUseCaseStub, 'update')
    const httpRequest = makeRequestMock()

    await sut.handle(httpRequest)

    expect(updateSpy).toHaveBeenCalledWith({
      name: 'valid_name',
      email: 'valid@email.com',
      academicRecord: '123456'
    })
  })

  it('Should return 200 when success', async () => {
    const { sut } = makeSut()
    const httpRequest = makeRequestMock()

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toEqual(ok(makeStudentModelMock()))
  })

  it('Should return 500 UpdateStudentUseCase.Update throws', async () => {
    const { sut, updateStudentUseCaseStub } = makeSut()
    jest.spyOn(updateStudentUseCaseStub, 'update').mockImplementationOnce(() => {
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

    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  it('Should return 400 if validation returns an error', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new RequiredFieldError('any_field'))
    const httpRequest = makeRequestMock()

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toEqual(badRequest(new RequiredFieldError('any_field')))
  })
})

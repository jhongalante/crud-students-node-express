import { IDeleteStudent } from '../../../../Domain/UseCases/Student/DeleteStudent'
import { IStudentModel } from '../../../../Domain/Types'
import { HttpRequest } from '../../../protocols'
import { Validation } from '../../../protocols/Validation'
import { badRequest, ok, internalServerError } from '../../../Helpers/Http/HttpHelpers'
import { RequiredFieldError, ServerError } from '../../../Errors'
import { DeleteStudentController } from './DeleteStudentController'

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

const makeDeleteStudentUseCase = (): IDeleteStudent => {
  class DeleteStudentUseCaseStub implements IDeleteStudent {
    async delete (academicRecord: string): Promise<IStudentModel> {
      const studentModelMock = makeStudentModelMock()
      return await new Promise(resolve => resolve(studentModelMock))
    }
  }
  return new DeleteStudentUseCaseStub()
}

interface SubTypes {
  sut: DeleteStudentController
  validationStub: Validation
  deleteStudentUseCaseStub: IDeleteStudent
}

const makeSut = (): SubTypes => {
  const deleteStudentUseCaseStub = makeDeleteStudentUseCase()
  const validationStub = makeValidation()
  const sut = new DeleteStudentController(deleteStudentUseCaseStub, validationStub)
  return {
    sut,
    deleteStudentUseCaseStub,
    validationStub
  }
}

describe('DeleteStudentController', () => {
  it('Should call DeleteStudent with correct values', async () => {
    const { sut, deleteStudentUseCaseStub } = makeSut()
    const deleteSpy = jest.spyOn(deleteStudentUseCaseStub, 'delete')
    const httpRequest = makeRequestMock()

    await sut.handle(httpRequest)

    expect(deleteSpy).toHaveBeenCalledWith('123456')
  })

  it('Should return 200 when success', async () => {
    const { sut } = makeSut()
    const httpRequest = makeRequestMock()

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toEqual(ok(makeStudentModelMock()))
  })

  it('Should return 500 DeleteStudentUseCase.Delete throws', async () => {
    const { sut, deleteStudentUseCaseStub } = makeSut()
    jest.spyOn(deleteStudentUseCaseStub, 'delete').mockImplementationOnce(() => {
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

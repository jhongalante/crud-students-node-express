import { IFindStudentByAcademicRecord } from '../../../../Domain/UseCases/FindStudentByAcademicRecord'
import { IStudentModel } from '../../../../Domain/Types/StudentModel'
import { HttpRequest } from '../../../protocols'
import { Validation } from '../../../protocols/Validation'
import { IAddStudent } from '../../../../Domain/UseCases/Student/AddStudent'
import { RegisterStudentController } from './RegisterStudentController'
import { badRequest, created, internalServerError } from '../../../Helpers/Http/HttpHelpers'
import { RequiredFieldError, ServerError } from '../../../Errors'

const makeRequestMock = (): HttpRequest => ({
  body: {
    name: 'valid_name',
    email: 'valid@email.com',
    cpf: '555.555.555-55',
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

const makeAddStudentUseCase = (): IAddStudent => {
  class AddStudentUseCaseStub implements IAddStudent {
    async add (student: IStudentModel): Promise<IStudentModel> {
      const studentModelMock = makeStudentModelMock()
      return await new Promise(resolve => resolve(studentModelMock))
    }
  }
  return new AddStudentUseCaseStub()
}

const makeFindStudentUseCase = (): IFindStudentByAcademicRecord => {
  class FindStudentByAcademicRecordStub implements IFindStudentByAcademicRecord {
    async findByAcademicRecord (academicRecord: string): Promise<IStudentModel> {
      return await new Promise(resolve => resolve(null))
    }
  }
  return new FindStudentByAcademicRecordStub()
}

interface SubTypes {
  sut: RegisterStudentController
  validationStub: Validation
  addStudentUseCaseStub: IAddStudent
  findByAcademicRecordStub: IFindStudentByAcademicRecord
}

const makeSut = (): SubTypes => {
  const addStudentUseCaseStub = makeAddStudentUseCase()
  const validationStub = makeValidation()
  const findByAcademicRecordStub = makeFindStudentUseCase()
  const sut = new RegisterStudentController(addStudentUseCaseStub, findByAcademicRecordStub, validationStub)
  return {
    sut,
    addStudentUseCaseStub,
    findByAcademicRecordStub,
    validationStub
  }
}

describe('RegisterStudentController', () => {
  it('Should call AddStudent with correct values', async () => {
    const { sut, addStudentUseCaseStub } = makeSut()
    const addSpy = jest.spyOn(addStudentUseCaseStub, 'add')
    const httpRequest = makeRequestMock()

    await sut.handle(httpRequest)

    expect(addSpy).toHaveBeenCalledWith({
      name: 'valid_name',
      email: 'valid@email.com',
      cpf: '555.555.555-55',
      academicRecord: '123456'
    })
  })

  it('Should return 201 when success', async () => {
    const { sut } = makeSut()
    const httpRequest = makeRequestMock()

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toEqual(created(makeStudentModelMock()))
  })

  it('Should return 500 AddStudentUseCase.Add throws', async () => {
    const { sut, addStudentUseCaseStub } = makeSut()
    jest.spyOn(addStudentUseCaseStub, 'add').mockImplementationOnce(() => {
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

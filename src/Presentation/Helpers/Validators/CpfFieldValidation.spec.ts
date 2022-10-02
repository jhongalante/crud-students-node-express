
import { InvalidFieldError } from '../../Errors'
import { CPFFieldValidation } from './CpfFieldValidation'

interface SutTypes {
  sut: CPFFieldValidation
}

const makeSut = (): SutTypes => {
  const sut = new CPFFieldValidation('cpf')
  return {
    sut
  }
}

describe('CPFFieldValidation', () => {
  test('Should return InvalidFieldError with invalid cpf', () => {
    const { sut } = makeSut()

    const error = sut.validate({ cpf: '12234-55512' })

    expect(error).toEqual(new InvalidFieldError('cpf'))
  })
})

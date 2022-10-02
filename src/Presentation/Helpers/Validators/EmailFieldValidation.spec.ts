
import { InvalidFieldError } from '../../Errors'
import { EmailFieldValidation } from './EmailFieldValidation'

interface SutTypes {
  sut: EmailFieldValidation
}

const makeSut = (): SutTypes => {
  const sut = new EmailFieldValidation('email')
  return {
    sut
  }
}

describe('EmailFieldValidation', () => {
  test('Should return InvalidFieldError if invalid email', () => {
    const { sut } = makeSut()

    const error = sut.validate({ email: 'invalid@emailcom' })

    expect(error).toEqual(new InvalidFieldError('email'))
  })
})

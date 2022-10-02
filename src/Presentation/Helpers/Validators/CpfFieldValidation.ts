import { InvalidFieldError } from '../../Errors'
import { Validation } from '../../protocols/Validation'
import validator from 'validator'

export class CPFFieldValidation implements Validation {
  constructor (private readonly fieldName: string) {}

  validate (input: any): Error {
    if (!validator.matches(input[this.fieldName], /^\d{3}\.\d{3}\.\d{3}-\d{2}$/)) {
      return new InvalidFieldError(this.fieldName)
    }
  }
}

import { InvalidFieldError } from '../../Errors'
import { Validation } from '../../protocols/Validation'
import validator from 'validator'

export class EmailFieldValidation implements Validation {
  constructor (private readonly fieldName: string) {}

  validate (input: any): Error {
    if (!validator.isEmail(input[this.fieldName])) {
      return new InvalidFieldError(this.fieldName)
    }
  }
}

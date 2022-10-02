import { RequiredFieldError } from '../../Errors'
import { Validation } from '../../protocols/Validation'

export class RequiredFieldValidation implements Validation {
  constructor (private readonly fieldName: string) {}

  validate (input: any): Error {
    if (!input[this.fieldName]) { return new RequiredFieldError(this.fieldName) }
  }
}

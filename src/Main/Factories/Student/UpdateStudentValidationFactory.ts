import {
  EmailFieldValidation,
  RequiredFieldValidation,
  ValidationComposite
} from '../../../Presentation/Helpers/Validators'
import { Validation } from '../../../Presentation/protocols/Validation'

export const makeUpdateStudentValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['name', 'email']) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new EmailFieldValidation('email'))
  return new ValidationComposite(validations)
}

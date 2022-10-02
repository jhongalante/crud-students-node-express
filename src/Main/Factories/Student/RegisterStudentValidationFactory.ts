import {
  EmailFieldValidation,
  RequiredFieldValidation,
  ValidationComposite,
  CPFFieldValidation
} from '../../../Presentation/Helpers/Validators'
import { Validation } from '../../../Presentation/protocols/Validation'

export const makeRegisterStudentValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['name', 'email', 'cpf', 'academicRecord']) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new EmailFieldValidation('email'))
  validations.push(new CPFFieldValidation('cpf'))
  return new ValidationComposite(validations)
}

import {
  RequiredFieldValidation,
  ValidationComposite
} from '../../../Presentation/Helpers/Validators'
import { Validation } from '../../../Presentation/protocols/Validation'

export const makeFindStudentByAcademicRecordValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['academicRecord']) {
    validations.push(new RequiredFieldValidation(field))
  }
  return new ValidationComposite(validations)
}

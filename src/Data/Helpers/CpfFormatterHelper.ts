import { IFormatter } from '../Interfaces/Helpers/Formatter'

export class CPFFormatterHelper implements IFormatter {
  formatFrom (cpf: string): string {
    return cpf.match(/\d/g).join('')
  }

  formatTo (cpf: string): string {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
  }
}

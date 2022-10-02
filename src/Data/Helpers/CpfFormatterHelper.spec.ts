import { IFormatter } from '../Interfaces/Helpers/Formatter'
import { CPFFormatterHelper } from './CpfFormatterHelper'

interface SubTypes {
  sut: IFormatter
}

const makeSut = (): SubTypes => {
  const sut = new CPFFormatterHelper()
  return {
    sut
  }
}

describe('CPFFormatterHelper', () => {
  it('formatter return the cpf with just numbers', () => {
    const { sut } = makeSut()

    const cpfFormatted = sut.formatFrom('555.555.555-55')

    expect(cpfFormatted).toStrictEqual('55555555555')
  })

  it('formatter return the cpf formatted', () => {
    const { sut } = makeSut()

    const cpfFormatted = sut.formatTo('55555555555')

    expect(cpfFormatted).toStrictEqual('555.555.555-55')
  })
})

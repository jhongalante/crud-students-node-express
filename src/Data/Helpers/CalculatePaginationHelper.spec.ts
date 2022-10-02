import { CalculatePaginationHelper } from './CalculatePaginationHelper'
import { ICalculatePaginationHelper } from '../Interfaces/Helpers/CalculatePaginationHelper'

interface SubTypes {
  sut: ICalculatePaginationHelper
}

const makeSut = (): SubTypes => {
  const sut = new CalculatePaginationHelper()
  return {
    sut
  }
}

describe('CPFFormatterHelper', () => {
  it('returns limit and offset with correct values calculated', () => {
    const { sut } = makeSut()

    const paginationCalculated = sut.calculatePagination(1, 2)

    expect(paginationCalculated).toStrictEqual({
      limit: 2,
      offset: 2
    })
  })
})

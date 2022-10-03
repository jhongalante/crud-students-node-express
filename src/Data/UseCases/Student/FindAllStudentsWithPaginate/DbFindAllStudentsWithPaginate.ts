import { IStudentWithPaginateModel } from '../../../../Domain/Types'
import { IFindAllStudentsWithPaginate } from '../../../../Domain/UseCases/Student/FindAllStudentsWithPaginate'
import { IFindAllStudentsWithPaginateRepository } from '../../../Interfaces/Db/Student/FindAllStudentsWithPaginateRepository'
import { ICalculatePaginationHelper } from '../../../Interfaces/Helpers/CalculatePaginationHelper'

export class DbFindAllStudentsWithPaginate implements IFindAllStudentsWithPaginate {
  private readonly findAllStudentsWithPaginateRepository: IFindAllStudentsWithPaginateRepository
  private readonly calculatePaginationHelper: ICalculatePaginationHelper

  constructor (findAllStudentsWithPaginateRepository: IFindAllStudentsWithPaginateRepository, calculatePaginationHelper: ICalculatePaginationHelper) {
    this.findAllStudentsWithPaginateRepository = findAllStudentsWithPaginateRepository
    this.calculatePaginationHelper = calculatePaginationHelper
  }

  async findAllWithPaginate (page: number, size: number): Promise<IStudentWithPaginateModel> {
    const { limit, offset } = this.calculatePaginationHelper.calculatePagination(page, size)
    return await this.findAllStudentsWithPaginateRepository.findAllWithPaginate(limit, offset)
  }
}

import { IStudentWithPaginateModel } from '../../../Domain/Types/StudentsWithPaginateModel'
import { ICalculatePaginationHelper } from '../../Interfaces/Helpers/CalculatePaginationHelper'
import { IFindAllStudentsWithPaginate } from '../../../Domain/UseCases/FindAllStudentsWithPaginate'
import { IFindAllStudentsWithPaginateRepository } from '../../Interfaces/Db/student/FindAllStudentsWithPaginateRepository'

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

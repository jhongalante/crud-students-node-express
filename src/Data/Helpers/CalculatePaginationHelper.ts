import { ICalculatePaginationHelperModel } from '../../Domain/Types'
import { ICalculatePaginationHelper } from '../Interfaces/Helpers/CalculatePaginationHelper'
export class CalculatePaginationHelper implements ICalculatePaginationHelper {
  calculatePagination (page: number, size: number): ICalculatePaginationHelperModel {
    const limit = size ? +size : 3
    const offset = page ? page * limit : 0
    return {
      limit,
      offset
    }
  }
}

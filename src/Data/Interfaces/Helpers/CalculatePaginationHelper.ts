import { ICalculatePaginationHelperModel } from '../../../Domain/Types/CalculatePaginationHelperModel'
export interface ICalculatePaginationHelper {
  calculatePagination(page: number, size: number): ICalculatePaginationHelperModel

}

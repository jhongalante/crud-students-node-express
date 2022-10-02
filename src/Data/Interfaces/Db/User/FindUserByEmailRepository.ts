import { IUserModel } from './../../../../Domain/Types/UserModel'

export interface IFindUserByEmailRepository {
  findByEmail (email: string): Promise<IUserModel>
}

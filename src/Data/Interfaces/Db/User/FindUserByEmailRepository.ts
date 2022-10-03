import { IUserModel } from './../../../../Domain/Types/User/UserModel'

export interface IFindUserByEmailRepository {
  findByEmail (email: string): Promise<IUserModel>
}

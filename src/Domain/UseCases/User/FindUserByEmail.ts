import { IUserModel } from '../../Types/UserModel'

export interface IFindUserByEmail {
  findByEmail (email: string): Promise<IUserModel>
}

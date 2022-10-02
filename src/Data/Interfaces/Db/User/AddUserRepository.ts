import { IUserModel } from './../../../../Domain/Types/UserModel'
import { ILoginModel } from './../../../../Domain/Types/LoginModel'

export interface IAddUserRepository {
  add (user: ILoginModel): Promise<IUserModel>
}

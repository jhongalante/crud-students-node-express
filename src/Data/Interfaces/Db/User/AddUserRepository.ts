import { IUserModel } from './../../../../Domain/Types/User/UserModel'
import { ILoginModel } from './../../../../Domain/Types/User/LoginModel'

export interface IAddUserRepository {
  add (user: ILoginModel): Promise<IUserModel>
}

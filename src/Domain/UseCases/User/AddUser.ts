import { ILoginModel } from './../../Types/User/LoginModel'
import { IUserModel } from '../../Types/User/UserModel'

export interface IAddUser {
  add (user: ILoginModel): Promise<IUserModel>
}

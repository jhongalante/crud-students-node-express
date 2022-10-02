import { ILoginModel } from './../../Types/LoginModel'
import { IUserModel } from '../../Types/UserModel'

export interface IAddUser {
  add (user: ILoginModel): Promise<IUserModel>
}

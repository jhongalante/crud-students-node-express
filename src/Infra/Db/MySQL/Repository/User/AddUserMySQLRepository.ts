import { UserModel } from './../../../../../Domain/Models/UserModel'
import { IUserModel } from './../../../../../Domain/Types/UserModel'
import { ILoginModel } from './../../../../../Domain/Types/LoginModel'
import { IAddUserRepository } from '../../../../../Data/Interfaces/Db/User/AddUserRepository'
import bcrypt from 'bcrypt'

export class AddUserMySQLRepository implements IAddUserRepository {
  async add (user: ILoginModel): Promise<IUserModel> {
    try {
      const salt = bcrypt.genSaltSync(10)
      const hashPassword = await bcrypt.hash(user.password, salt)
      const createdUser = await UserModel.create(
        {
          email: user.email,
          password: hashPassword
        }
      )
      return {
        id: createdUser.get('id') as number,
        email: createdUser.get('email') as string,
        password: createdUser.get('password') as string
      }
    } catch (error) {
      return error
    }
  }
}

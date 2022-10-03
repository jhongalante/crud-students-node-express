import { UserModel } from './../../../../../Domain/Models/UserModel'
import { IUserModel } from './../../../../../Domain/Types'
import { IFindUserByEmailRepository } from '../../../../../Data/Interfaces/Db/User/FindUserByEmailRepository'

export class FindUserByEmailMySQLRepository implements IFindUserByEmailRepository {
  async findByEmail (email: string): Promise<IUserModel> {
    try {
      const foundUser = await UserModel.findOne({ where: { email } })
      if (!foundUser) {
        return null
      }
      return {
        id: foundUser.get('id') as number,
        email: foundUser.get('email') as string,
        password: foundUser.get('password') as string
      }
    } catch (error) {
      return error
    }
  }
}

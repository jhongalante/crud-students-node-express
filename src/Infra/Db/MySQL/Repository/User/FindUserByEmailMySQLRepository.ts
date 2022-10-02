import { UserModel } from './../../../../../Domain/Models/UserModel'
import { IUserModel } from './../../../../../Domain/Types/UserModel'
import { IFindUserByEmailRepository } from '../../../../../Data/Interfaces/Db/User/FindUserByEmailRepository'

export class FindUserByEmailMySQLRepository implements IFindUserByEmailRepository {
  async findByEmail (email: string): Promise<IUserModel> {
    try {
      const foundUser = await UserModel.findOne({ where: { email } })
      return foundUser
    } catch (error) {
      return error
    }
  }
}

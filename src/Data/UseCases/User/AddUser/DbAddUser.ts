import { IUserModel } from '../../../../Domain/Types/UserModel'
import { ILoginModel } from '../../../../Domain/Types/LoginModel'
import { IAddUser } from '../../../../Domain/UseCases/User/AddUser'
import { IAddUserRepository } from '../../../Interfaces/Db/User/AddUserRepository'

export class DbAddUser implements IAddUser {
  private readonly addUserRepository: IAddUserRepository

  constructor (addUserRepository: IAddUserRepository) {
    this.addUserRepository = addUserRepository
  }

  async add (user: ILoginModel): Promise<IUserModel> {
    return await this.addUserRepository.add(user)
  }
}

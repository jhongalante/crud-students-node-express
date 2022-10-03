import { IFindUserByEmailRepository } from '../../../Interfaces/Db/User/FindUserByEmailRepository'
import { IFindUserByEmail } from '../../../../Domain/UseCases/User/FindUserByEmail'
import { IUserModel } from '../../../../Domain/Types'

export class DbFindUserByEmail implements IFindUserByEmail {
  private readonly findUserByEmailRepository: IFindUserByEmailRepository

  constructor (findUserByEmailRepository: IFindUserByEmailRepository) {
    this.findUserByEmailRepository = findUserByEmailRepository
  }

  async findByEmail (email: string): Promise<IUserModel> {
    return await this.findUserByEmailRepository.findByEmail(email)
  }
}

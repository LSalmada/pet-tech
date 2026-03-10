import { IUser } from '@/entities/models/user.interface'
import { IPerson } from '@/entities/models/person.interface'

export interface IUserRepository {
  findWithPerson(userId: number): Promise<(IUser & IPerson) | undefined>
  create(user: IUser): Promise<IUser | undefined>
}

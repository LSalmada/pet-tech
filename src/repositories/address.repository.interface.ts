import { Address } from '@/entities/address.entity'
import { Person } from '@/entities/person.entity'

export interface IAddressRepository {
  findAddressByPersonId(
    personId: number,
    page: number,
    limit: number,
  ): Promise<(Address & Person)[]>

  create(address: Address): Promise<Address> | undefined
}

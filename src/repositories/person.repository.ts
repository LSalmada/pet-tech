import { Person } from '@/entities/person.entity'

export class PersonRepository {
  async findById(id: number): Promise<Person> {
    return {
      id,
      cpf: '12312344545',
      name: 'Person 1',
      birth: new Date('1995-12-32'),
      email: 'user@email.com',
      user_id: 1,
    }
  }

  async create(person: Person): Promise<Person> {
    return person
  }
}

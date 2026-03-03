import { PersonRepository } from '@/repositories/person.repository'
import { Person } from '@/entities/person.entity'

export class CreatePersonUseCase {
  constructor(private personRepository: PersonRepository) {}

  handler(person: Person) {
    return this.personRepository.create(person)
  }
}

import { PersonDTO } from '@domain/person/dto/person.dto';
import { Observable } from 'rxjs';

export abstract class PersonGatewayInterface {
  abstract listPersons(): Observable<PersonDTO[]>;
  abstract findByPersonId(personId: string): Observable<PersonDTO>;
  abstract createPerson(person: PersonDTO): Observable<PersonDTO>;
  abstract updatePerson(
    personId: string,
    person: PersonDTO,
  ): Observable<PersonDTO>;

  abstract deletePerson(personId: string): Observable<void>;
}

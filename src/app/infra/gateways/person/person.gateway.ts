import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { PersonDTO } from '@domain/person/dto/person.dto';
import { PersonGatewayInterface } from '@infra/interfaces/person/person-gateway.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PersonGateway implements PersonGatewayInterface {
  private readonly http = inject(HttpClient);

  listPersons(): Observable<PersonDTO[]> {
    return this.http.get<PersonDTO[]>('/api-rest/person');
  }

  findByPersonId(personId: string): Observable<PersonDTO> {
    return this.http.get<PersonDTO>(`/api-rest/person/${personId}`);
  }

  createPerson(person: PersonDTO): Observable<PersonDTO> {
    return this.http.post<PersonDTO>('/api-rest/person', person);
  }

  updatePerson(personId: string, person: PersonDTO): Observable<PersonDTO> {
    return this.http.put<PersonDTO>(`/api-rest/person/${personId}`, person);
  }

  deletePerson(personId: string): Observable<void> {
    return this.http.delete<void>(`/api-rest/person/${personId}`);
  }
}

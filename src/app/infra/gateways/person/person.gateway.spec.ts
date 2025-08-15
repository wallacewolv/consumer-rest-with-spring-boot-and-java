import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { PERSON_DUMMY } from '@core/dummys/person.dummy';
import { PersonDTO } from '@domain/person/dto/person.dto';

import { PersonGateway } from './person.gateway';

describe('PersonGateway', () => {
  let service: PersonGateway;
  let httpMock: HttpTestingController;

  const mockPersons = PERSON_DUMMY.PERSONS;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PersonGateway],
    });

    service = TestBed.inject(PersonGateway);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('listPersons should GET persons', () => {
    service.listPersons().subscribe((persons) => {
      expect(persons).toEqual(mockPersons);
    });

    const req = httpMock.expectOne('/api-rest/person');
    expect(req.request.method).toBe('GET');
    req.flush(mockPersons);
  });

  it('findByPersonId should GET a single person', () => {
    const mockPerson = mockPersons[0];

    service.findByPersonId('1').subscribe((person) => {
      expect(person).toEqual(mockPerson);
    });

    const req = httpMock.expectOne('/api-rest/person/1');
    expect(req.request.method).toBe('GET');
    req.flush(mockPerson);
  });

  it('createPerson should POST a person', () => {
    const newPerson: PersonDTO = {
      id: 3,
      firstName: 'Alice',
      lastName: 'Brown',
      address: '789 Road',
      gender: 'Female',
    };

    service.createPerson(newPerson).subscribe((person) => {
      expect(person).toEqual(newPerson);
    });

    const req = httpMock.expectOne('/api-rest/person');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newPerson);
    req.flush(newPerson);
  });

  it('updatePerson should PUT a person', () => {
    const updatedPerson: PersonDTO = {
      ...mockPersons[0],
      firstName: 'Updated',
    };

    service.updatePerson('1', updatedPerson).subscribe((person) => {
      expect(person).toEqual(updatedPerson);
    });

    const req = httpMock.expectOne('/api-rest/person/1');
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedPerson);
    req.flush(updatedPerson);
  });

  it('deletePerson should DELETE a person', () => {
    service.deletePerson('1').subscribe((response) => {
      expect(response).toBeNull();
    });

    const req = httpMock.expectOne('/api-rest/person/1');
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});

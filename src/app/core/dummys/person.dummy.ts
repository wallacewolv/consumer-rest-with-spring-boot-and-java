import { PersonDTO } from '@domain/person/dto/person.dto';

export const PERSON_DUMMY = {
  get PERSONS(): PersonDTO[] {
    return [
      {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        address: '123 Street',
        gender: 'Male',
      },
      {
        id: 2,
        firstName: 'Jane',
        lastName: 'Smith',
        address: '456 Avenue',
        gender: 'Female',
      },
    ];
  },
};

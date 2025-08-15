import { PersonDTO } from '../dto/person.dto';
import { Person } from './person.entity';

describe('Entity', () => {
  let dto: PersonDTO;

  beforeEach(() => {
    dto = {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      address: '123 Street',
      gender: 'Male',
    };
  });

  it('should create an entity with correct values', () => {
    const entity = new Person(dto);

    expect(entity.id).toBe(1);
    expect(entity.firstName).toBe('John');
    expect(entity.lastName).toBe('Doe');
    expect(entity.address).toBe('123 Street');
    expect(entity.gender).toBe('Male');
  });

  it('should change id', () => {
    const entity = new Person(dto);
    entity.changeId(2);
    expect(entity.id).toBe(2);
  });

  it('should change firstName', () => {
    const entity = new Person(dto);
    entity.changeFirstName('Jane');
    expect(entity.firstName).toBe('Jane');
  });

  it('should change lastName', () => {
    const entity = new Person(dto);
    entity.changeLastName('Smith');
    expect(entity.lastName).toBe('Smith');
  });

  it('should change address', () => {
    const entity = new Person(dto);
    entity.changeAddress('456 Avenue');
    expect(entity.address).toBe('456 Avenue');
  });

  it('should change gender', () => {
    const entity = new Person(dto);
    entity.changeGender('Female');
    expect(entity.gender).toBe('Female');
  });

  it('should return correct JSON representation', () => {
    const entity = new Person(dto);
    const json = entity.toJSON();

    expect(json).toEqual(dto);
  });
});

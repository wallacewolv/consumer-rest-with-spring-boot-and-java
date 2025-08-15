import { PersonDTO } from '../dto/person.dto';

export class Person {
  private _id!: number;
  private _firstName!: string;
  private _lastName!: string;
  private _address!: string;
  private _gender!: string;

  constructor({ id, firstName, lastName, address, gender }: PersonDTO) {
    this._id = id;
    this._firstName = firstName;
    this._lastName = lastName;
    this._address = address;
    this._gender = gender;
  }

  get id(): number {
    return this._id;
  }

  get firstName(): string {
    return this._firstName;
  }

  get lastName(): string {
    return this._lastName;
  }

  get address(): string {
    return this._address;
  }

  get gender(): string {
    return this._gender;
  }

  changeId(id: number): void {
    this._id = id;
  }

  changeFirstName(firstName: string): void {
    this._firstName = firstName;
  }

  changeLastName(lastName: string): void {
    this._lastName = lastName;
  }

  changeAddress(address: string): void {
    this._address = address;
  }

  changeGender(gender: string): void {
    this._gender = gender;
  }

  toJSON(): PersonDTO {
    return {
      id: this._id,
      firstName: this._firstName,
      lastName: this._lastName,
      address: this._address,
      gender: this._gender,
    };
  }
}

import { TestBed, inject } from '@angular/core/testing';

import { PersonGateway } from './person.gateway';

describe('Gateway: Person', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PersonGateway],
    });
  });

  it('should ...', inject([PersonGateway], (gateway: PersonGateway) => {
    expect(gateway).toBeTruthy();
  }));
});

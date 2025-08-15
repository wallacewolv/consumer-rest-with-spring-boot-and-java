import { Provider } from '@angular/core';
import { PersonGateway } from '@infra/gateways/person/person.gateway';
import { PersonGatewayInterface } from '@infra/interfaces/person/person-gateway.interface';

export const dependencyInjection: Array<Provider> = [
  {
    provide: PersonGatewayInterface,
    useClass: PersonGateway,
  },
];

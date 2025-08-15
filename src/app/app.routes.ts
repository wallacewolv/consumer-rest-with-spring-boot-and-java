import { Routes } from '@angular/router';
import { Route } from '@core/enums/route.enum';

export const routes: Routes = [
  { path: Route.HOME, redirectTo: Route.PERSON, pathMatch: 'full' },
  {
    path: Route.PERSON,
    loadComponent: () =>
      import('@presentation/person/person.component').then(
        (m) => m.PersonComponent,
      ),
  },
  { path: Route.WILD_CARD, redirectTo: Route.HOME },
];

import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/page-main/page-main.component')
  },
  {
    path: 'users/:id',
    loadComponent: () => import('./pages/page-user/page-user.component')
  }
];

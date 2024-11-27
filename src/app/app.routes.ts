import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'react-page',
    loadComponent: () => import('./pages/page-react/page-react.component')
  }
];

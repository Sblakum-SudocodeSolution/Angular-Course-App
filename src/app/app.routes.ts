import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./component/home/home.component').then((c) => c.HomeComponent),
  },

  {
    path: 'about',
    loadComponent: () =>
      import('./component/about/about.component').then((c) => c.AboutComponent),
  },

  {
    path: 'admin',
    loadComponent: () =>
      import('./component/admin/admin.component').then((c) => c.AdminComponent),
  },
];

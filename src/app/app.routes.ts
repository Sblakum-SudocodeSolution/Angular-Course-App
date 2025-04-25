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
  {
    path: 'reactive-form',
    loadComponent: () =>
      import('./component/form/reactive-form/reactive-form.component').then(
        (c) => c.ReactiveFormComponent
      ),
  },
  {
    path: 'temaplate-driven-form',
    loadComponent: () =>
      import(
        './component/form/template-driven-form/template-driven-form.component'
      ).then((c) => c.TemplateDrivenFormComponent),
  },

  {
    path: 'temaplate-driven-form-example',
    loadComponent: () =>
      import(
        './component/form/template-driven-form-example/template-driven-form-example.component'
      ).then((c) => c.TemplateDrivenFormExampleComponent),
  },

  {
    path: 'reactive-form-example',
    loadComponent: () =>
      import(
        './component/form/reactive-form-example/reactive-form-example.component'
      ).then((c) => c.ReactiveFormExampleComponent),
  },
];

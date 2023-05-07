import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'pages',
    loadChildren: () => import('./modules/list/list.module').then(m => m.ListModule)
  },
  {
    path: 'pages',
    loadChildren: () => import('./modules/edit/edit.module').then(m => m.EditModule)
  },
  {
    path: 'pages',
    loadChildren: () => import('./modules/new/new.module').then(m => m.NewModule)
  },
  {
    path: '**',
    redirectTo: 'pages/list'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

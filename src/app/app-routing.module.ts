import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotificationMessageSearchModule } from './modules/notification-message-search/notification-message-search.module';
import { NotificationMessageEditModule } from './modules/notification-message-edit/notification-message-edit.module';
import { NotificationMessageNewModule } from './modules/notification-message-new/notification-message-new.module';
import { NotificationEventsSearchModule } from './modules/notification-events-search/notification-events-search.module';

const routes: Routes = [
  {
    path: 'pages',
    loadChildren: () =>  NotificationMessageSearchModule,
  },
  {
    path: 'pages',
    loadChildren: () => NotificationMessageEditModule,
  },
  {
    path: 'pages',
    loadChildren: () => NotificationMessageNewModule,
  },
  {
    path: 'pages',
    loadChildren: () => NotificationEventsSearchModule,
  },
  {
    path: '**',
    redirectTo: 'pages/search',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { SharedModule } from '../../shared/shared.module';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NotificationEventsSearchFormComponent } from './form/notification-events-search-form.component';
import { NotificationEventsSearchContainerComponent } from './components/container/notification-events-search.container.component';
import { NotificationEventsSearchViewComponent } from './components/view/notification-events-search.view.component';


const routes: Routes = [
  {
    path: 'events',
    component: NotificationEventsSearchContainerComponent,
  }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule
  ],
  declarations: [
    NotificationEventsSearchFormComponent,
    NotificationEventsSearchContainerComponent,
    NotificationEventsSearchViewComponent
  ]
})
export class NotificationEventsSearchModule { }

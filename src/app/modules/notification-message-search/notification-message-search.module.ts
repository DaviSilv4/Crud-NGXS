import { SharedModule } from '../../shared/shared.module';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NotificationMessageContainerComponent } from './components/container/notification-message-search.container.component';
import { NotificationMessageViewComponent } from './components/view/notification-message-search.view.component';
import { NotificationMessageFormComponent } from './form/notification-message-search-form.component';


const routes: Routes = [
  {
    path: 'search',
    component: NotificationMessageContainerComponent,
  }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule
  ],
  declarations: [
    NotificationMessageContainerComponent,
    NotificationMessageViewComponent,
    NotificationMessageFormComponent
  ]
})
export class NotificationMessageSearchModule { }

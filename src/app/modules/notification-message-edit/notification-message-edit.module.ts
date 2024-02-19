import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';
import { NotificationMessageEditContainerComponent } from './components/container/notification-message-edit.container.component';
import { NotificationMessageEditViewComponent } from './components/view/notification-message-edit.view.component';
import { NotificationMessageEditFormComponent } from './form/notification-message-edit-form.component';
import { CommonModule } from '@angular/common';


const routes: Routes = [
  {
    path: 'edit/:id',
    component: NotificationMessageEditContainerComponent
  }
];

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule
  ],
  declarations: [
    NotificationMessageEditContainerComponent,
    NotificationMessageEditViewComponent,
    NotificationMessageEditFormComponent
  ],
})
export class NotificationMessageEditModule { }

import { SharedModule } from '../../shared/shared.module';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { NotificationMessageNewContainerComponent } from './components/container/notification-message-new.container.component';
import { NotificationMessageNewViewComponent } from './components/view/notification-message-new.view.component';
import { NotificationMessageNewFormComponent } from './form/notification-message-new-form.component';


const routes: Routes = [
  {
    path: 'new',
    component: NotificationMessageNewContainerComponent
  }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule
  ],
  declarations: [
    NotificationMessageNewContainerComponent,
    NotificationMessageNewViewComponent,
    NotificationMessageNewFormComponent
  ],
})
export class NotificationMessageNewModule { }

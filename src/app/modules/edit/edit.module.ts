import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from './../../shared/shared.module';
import { EditContainerComponent } from './components/container/edit.container.component';
import { EditViewComponent } from './components/view/edit.view.component';
import { EditFormComponent } from './form/edit-form.component';
import { CommonModule } from '@angular/common';


const routes: Routes = [
  {
    path: 'edit/:id',
    component: EditContainerComponent
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
    EditContainerComponent,
    EditViewComponent,
    EditFormComponent
  ],
})
export class EditModule { }

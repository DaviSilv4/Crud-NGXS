import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { NewContainerComponent } from './components/container/new.container.component';
import { NewViewComponent } from './components/view/new.view.component';
import { NewFormComponent } from './form/new-form.component';


const routes: Routes = [
  {
    path: 'new',
    component: NewContainerComponent
  }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule
  ],
  declarations: [
    NewContainerComponent,
    NewViewComponent,
    NewFormComponent
  ],
})
export class NewModule { }

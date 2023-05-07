import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ListContainerComponent } from './components/container/list.container.component';
import { ListViewComponent } from './components/view/list.view.component';
import { ListFormComponent } from './form/booksForm/list-form.component';


const routes: Routes = [
  {
    path: 'list',
    component: ListContainerComponent
  }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule
  ],
  declarations: [
    ListContainerComponent,
    ListViewComponent,
    ListFormComponent
  ],
})
export class ListModule { }

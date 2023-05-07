import { ModalGenericModule } from './modal-generic/modal-generic.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ModalGenericModule
  ],
  declarations: [
    HeaderComponent
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    ModalGenericModule,
    HeaderComponent
  ],
})
export class SharedModule { }

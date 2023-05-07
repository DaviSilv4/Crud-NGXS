import { Location } from '@angular/common';
import { Component, OnInit, Output } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { catchError, of, take, tap } from 'rxjs';
import { ApiService } from 'src/app/service/api-service.service';
import { Store } from '@ngxs/store';
import { AddMessage } from 'src/app/store/actions/message.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-form',
  templateUrl: './new-form.component.html',
  styleUrls: ['./new-form.component.scss']
})
export class NewFormComponent implements OnInit {

  test = false;
  @Output() toggle = false;

  form = this.formBuilder.group({
    body: ['', [Validators.required]],
    campaignCode: ['', Validators.required],
    messageType: ['', Validators.required],
    groupSupport: ['', Validators.required],
    smtp: [true],
    zenvia: [false],
  });

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private location: Location,
    private store: Store,
    private router: Router
  ) {}

  ngOnInit() {}

  onSubmit(form: any) {
    this.store.dispatch(new AddMessage(form.value));
    this.toggle = !this.toggle;
    // this.router.navigate(['/pages/list'])
  }

  getErrorMessage(filedName: string){
    const filed = this.form.get(filedName);
    if(filed?.hasError('required')){
      return 'Campo obrigatorio ' + filedName
    }
    return 'Campo invalido'
  }

  onCancel(){
    this.location.back();
  }
}

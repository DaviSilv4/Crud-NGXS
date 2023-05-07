import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { GetMessageTeste, SearchMenu } from 'src/app/store/actions/message.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-form',
  templateUrl: './list-form.component.html',
  styleUrls: ['./list-form.component.scss']
})
export class ListFormComponent implements OnInit {

  form = this.formBuilder.group({
    campaignCode: ['', Validators.required],
    messageType: ['', Validators.required]
  });

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private store: Store,
    private router: Router
  ) {}

  ngOnInit() {}

  search(form: any){
    // this.store.dispatch(new SearchMenu(form.value));
    this.store.dispatch(new GetMessageTeste(form.value));

  }

  redirectNew(){
    this.router.navigate(['pages/new']);
  }

}

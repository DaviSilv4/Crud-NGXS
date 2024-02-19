import { Component, OnDestroy } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Select, Store } from '@ngxs/store';

import { GetMessageParam, UpdateMessage } from 'src/app/store/actions/message.actions';
import { MessaegeState } from 'src/app/store/state/message.state';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-notification-message-search-form',
  templateUrl: './notification-message-search-form.component.html',
  styleUrls: ['./notification-message-search-form.component.scss']
})
export class NotificationMessageFormComponent implements OnDestroy {

  @Select(MessaegeState.getMessageFailed) searchFailed!: Observable<string>;

  toggle =  false;
  title!: string;

  form = this.formBuilder.group({
    campaignCode: ['', Validators.required],
    messageType: ['', Validators.required]
  });

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private store: Store,
    private router: Router
  ) {

  }

  ngOnDestroy(): void {
    this.store.dispatch(new UpdateMessage(undefined))
  }

  search(form: any){
    if(form.value){
      this.store.dispatch(new GetMessageParam(form.value));
      this.form.reset();
    }

    this.searchFailed.pipe(
      tap((res) => {
        if(res){
          this.title = res;
          this.toggle = true;
        }
      }
    )).subscribe()
  }

  public closeModal(): void {
    this.toggle = !this.toggle;
    this.store.dispatch(new UpdateMessage(undefined))
  }

  redirectNew(){
    this.router.navigate(['pages/new']);
  }

}

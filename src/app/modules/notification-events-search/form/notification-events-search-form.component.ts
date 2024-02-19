import { Component, OnDestroy } from '@angular/core';
import { FormControl, NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Select, Store } from '@ngxs/store';

import { GetEvent, GetMessage, GetMessageId, UpdateMessage } from 'src/app/store/actions/message.actions';
import { MessaegeState } from 'src/app/store/state/message.state';
import { Observable, tap } from 'rxjs';
import { formatDate } from '@angular/common';


@Component({
  selector: 'app-notification-events-search-form',
  templateUrl: './notification-events-search-form.component.html',
  styleUrls: ['./notification-events-search-form.component.scss']
})
export class NotificationEventsSearchFormComponent implements OnDestroy {

  @Select(MessaegeState.getMessageFailed) searchFailed!: Observable<string>;

  toggle =  false;
  title!: string;
  post = {
    startDate: new Date(Date.now()),
    endDate: new Date(Date.now())
  }


  form = this.formBuilder.group({
    messageId:  ['', Validators.required],
    startDate: new FormControl((new Date()).toISOString().substring(0,10)),
    endDate:  [formatDate(this.post.endDate, 'dd-MM-yyyy', 'en'), [Validators.required]]
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
    if(this.form.get('messageId')?.valid){
      this.store.dispatch(new GetMessageId(form.value));
    }else{
      this.store.dispatch(new GetEvent());
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

  listSearch(form: any){
    this.store.dispatch(new GetMessage());
    this.form.reset();
  }

  redirectNew(){
    this.router.navigate(['pages/events/new']);
  }

}

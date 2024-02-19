import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

import { Select, Store } from '@ngxs/store';

import { Observable, Subscription, tap } from 'rxjs';
import { MessaegeState } from 'src/app/store/state/message.state';
import { UpdateMessage } from 'src/app/store/actions/message.actions';
import { EventModel } from 'src/app/model/event.model';

@Component({
  selector: 'app-notification-events-search',
  templateUrl: './notification-events-search.view.component.html',
  styleUrls: ['./notification-events-search.view.component.scss']
})
export class NotificationEventsSearchViewComponent implements OnInit{

  @Output() toggle = false;
  test!: string;
  listIndetificador =  [
    {
      "id": "id",
      "messageId": "MessageId",
      "objectKey": "ObjectKey",
      "attributes": "Attributes",
      "data": "Data",
      "createDate": "CreateDate",
      "status": "Status"
    }
  ];

  @Select(MessaegeState.getMessage) search$!: Observable<EventModel[]>;
  @Select(MessaegeState.getMessageFailed) searchFailed!: Observable<string>;

  message!: EventModel[];
  messageFailed!: string;
  menuLoadedSub!: Subscription;
  modalSub!: Subscription;

  constructor(
    private router: Router,
    private store:  Store
    ){}

  ngOnInit() {
    this.menuLoadedSub =  this.search$.pipe(
      tap((res) => {
        this.message = res
      }),
    ).subscribe();

  }

  ngOnDestroy() {
    this.menuLoadedSub.unsubscribe();
    this.store.dispatch(new UpdateMessage(undefined))
  }

  redirectToMessage(){
    this.router.navigate(['pages/list]']);
  }

  updateList(id: any){
     this.router.navigate(['pages/edit/' + id._id]);
  }

}

import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

import { Select, Store } from '@ngxs/store';

import { Observable, Subscription, tap } from 'rxjs';
import { MessaegeState } from 'src/app/store/state/message.state';
import { MessageModel } from 'src/app/model/message.model';
import { UpdateMessage } from 'src/app/store/actions/message.actions';

@Component({
  selector: 'app-notification-message-search',
  templateUrl: './notification-message-search.view.component.html',
  styleUrls: ['./notification-message-search.view.component.scss']
})
export class NotificationMessageViewComponent implements OnInit{

  @Output() toggle = false;
  open!: string;

  @Select(MessaegeState.getMessageParam) search$!: Observable<MessageModel[]>;
  @Select(MessaegeState.getMessageFailed) searchFailed!: Observable<string>;

  message!: MessageModel[];
  messageFailed!: string;
  menuLoadedSub!: Subscription;
  modalSub!: Subscription;

  listIndetificador =  [
    {
      "body": "body",
      "campaignCode": "Código da Campanha",
      "messageType": "Tipo da Mensagem",
      "groupSupport": "Grupo de Suporte",
      "url": "Url",
      "jsonLogic": "Lógica JSON",
      "isCampaing": "isCampaing",
      "isSmtp": "isSmtp",
      "_id": "_id",
      "acao": "Ação"
    }
  ];

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

  redirectToEvents(){
    this.router.navigate(['pages/events']);
  }

  updateList(id: any){
     this.router.navigate(['pages/edit/' + id._id]);
  }

}

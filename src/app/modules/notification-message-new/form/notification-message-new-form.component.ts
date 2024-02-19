import { Location } from '@angular/common';
import { Component, Output } from '@angular/core';
import { FormArray, NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Store, Select } from '@ngxs/store';

import { Observable, tap } from 'rxjs';
import { AddMessage, UpdateMessage } from 'src/app/store/actions/message.actions';
import { MessaegeState } from 'src/app/store/state/message.state';
import { MessageModel } from 'src/app/model/message.model';


@Component({
  selector: 'app-notification-message-new-form',
  templateUrl: './notification-message-new-form.component.html',
  styleUrls: ['./notification-message-new-form.component.scss']
})
export class NotificationMessageNewFormComponent  {

  @Output() toggle = false;
  @Output() toggleAlert = false;

  campaingCode!: MessageModel;
  title!: string;

  @Select(MessaegeState.getMessage) selectedMenu$!: Observable<MessageModel>;
  @Select(MessaegeState.getMessageFailed) failed$!: Observable<MessageModel>;


  form = this.formBuilder.group({
    body: ['', Validators.required],
    campaignCode: ['', Validators.required],
    messageType: ['', Validators.required],
    groupSupport: ['', Validators.required],
    destinations: this.formBuilder.array([
      this.formBuilder.group({
        jsonLogic: ['', Validators.required],
        url: ['', Validators.required]
      })
    ]),
    isCampaign: [false, Validators.required],
    isSmtp: [false, Validators.required]
  });



  constructor(
    private formBuilder: NonNullableFormBuilder,
    private location: Location,
    private store: Store,
    private router: Router
  ) {}

  onSubmit(form: any) {
    if(form.get('isSmtp')?.value && form.get('isCampaign')?.value){
      this.toggleAlert = true;
      this.title = `Apenas um dos campos <strong>"isCampaign"</strong> e <strong>"isSmtp"</strong> deve estar marcado como <strong>"true"</strong>. Por favor, revise o formulário`
    }else if(!form.get('isSmtp')?.value && !form.get('isCampaign')?.value){
      this.toggleAlert = true;
      this.title = `Apenas um dos campos <strong>"isCampaign"</strong> e <strong>"isSmtp"</strong> deve estar marcado como <strong>"false"</strong>. Por favor, revise o formulário`
    }
    else{
      this.store.dispatch(new AddMessage(form.value));
      this.selectedMenu$.pipe(
        tap((res) => {
          if (res) {
            this.title = `Salvo com sucesso 🙂`
            this.campaingCode = res;
            this.toggle = true;
          }
        })
      ).subscribe();

    }

    this.failed$.pipe(
      tap((res) => {
        if (res) {
          this.title = `Opps! Serviço pode está temporariamente indisponível😥`
          this.toggle = true;
        }
      })
    ).subscribe();
  }

  handleKeydown(event:any) {
    if (event.key == 'Tab') {
        event.preventDefault();
        const start = event.target.selectionStart;
        const end = event.target.selectionEnd;
        event.target.value = event.target.value.substring(0, start) + '\t' + event.target.value.substring(end);
        event.target.selectionStart = event.target.selectionEnd = start + 1;
    }
}

  public get destinations() {
    return this.form.get('destinations') as FormArray
  }

  removeDestinations(destinations: any){
    this.destinations.removeAt(destinations)
  }

  getErrorMessage(filedName: string) {
    const filed = this.form.get(filedName);
    if (filed?.hasError('required')) {
      return 'Campo obrigatorio ' + filedName
    }
    return 'Campo invalido'
  }

  public closeModal(): void {
    this.toggle = !this.toggle;
    if (this.campaingCode) {
      this.router.navigate(['pages/list']);
    }
    this.store.dispatch(new UpdateMessage(undefined))
  }

  public closeAlertModal(): void {
    this.toggleAlert = !this.toggleAlert;
  }

  addDestinations(){
    this.destinations.push(this.formBuilder.group({
      jsonLogic: ['', Validators.required],
      url: ['', Validators.required]
    }))
  }

  onCancel() {
    this.location.back();
  }
}

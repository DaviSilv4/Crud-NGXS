import { Location } from '@angular/common';
import { Component, OnInit, Output } from '@angular/core';
import { FormArray, NonNullableFormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, Select } from '@ngxs/store';
import { Observable, take, tap } from 'rxjs';
import { MessageModel } from 'src/app/model/message.model';
import { ApiService } from 'src/app/service/api-service.service';
import { SetSelectedMenu, UpdateMenu, UpdateMessage } from 'src/app/store/actions/message.actions';
import { MessaegeState } from 'src/app/store/state/message.state';

@Component({
  selector: 'app-notification-message-edit-form',
  templateUrl: './notification-message-edit-form.component.html',
  styleUrls: ['./notification-message-edit-form.component.scss']
})
export class NotificationMessageEditFormComponent implements OnInit {

  message!: MessageModel;
  title!: string;
  campaingCode!: MessageModel;

  @Output() toggle = false;
  @Output() toggleAlert = false;

  @Select(MessaegeState.selectedMenus) selectedMenu$!: Observable<MessageModel>;
  @Select(MessaegeState.getMessageFailed) failed$!: Observable<MessageModel>;

  form = this.formBuilder.group({
    body: [''],
    campaignCode: [''],
    messageType: [''],
    groupSupport: [''],
    destinations: this.formBuilder.array([
      this.formBuilder.group({
        jsonLogic: [''],
        url: ['']
      })
    ]),
    isCampaign: [false],
    isSmtp: [false],
    _id: ['']
  });

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private apiService: ApiService,
    private location: Location,
    private activateRoute: ActivatedRoute,
    private store: Store,
    private router: Router
  ) {}

  ngOnInit() {
    this.activateRoute.paramMap.pipe(
      tap((params) => {
        this.apiService.getId(params.get('id'))
        .pipe(
          tap(params => {
            this.message = params;
            this.getMenuId(params.campaignCode)
        }))
        .subscribe()
      })
    ).subscribe();
  }

  onSubmit(form: any) {
    if(form.get('isSmtp')?.value && form.get('isCampaign')?.value){
      this.toggleAlert = true;
      this.title = `Apenas um dos campos <strong>"isCampaign"</strong> e <strong>"isSmtp"</strong> deve estar marcado como <strong>"true"</strong>. Por favor, revise o formulário`
    }else if(!form.get('isSmtp')?.value && !form.get('isCampaign')?.value){
      this.toggleAlert = true;
      this.title = `Apenas um dos campos <strong>"isCampaign"</strong> e <strong>"isSmtp"</strong> deve estar marcado como <strong>"false"</strong>. Por favor, revise o formulário`
    }else{
    this.store.dispatch(new UpdateMenu(form.value))
    this.selectedMenu$.pipe(
      tap((res) => {
        if(res){
          this.title = `Editado com sucesso 🙂`
          this.campaingCode = res;
          this.toggle = true;
        }
      })
    ).subscribe();
    }
    this.failed$.pipe(
      tap((res) => {
        if(res){
          this.title = `Opps! Serviço pode está temporariamente indisponível😥`
          this.toggle = true;
        }
      })
    ).subscribe();
  }

  getMenuId(id: string){
    this.store.dispatch(new SetSelectedMenu(id))
    this.selectedMenu$.pipe(
      tap(() => {
        this.form.patchValue({
          body: this.message.body,
          campaignCode: this.message.campaignCode,
          messageType: this.message.messageType,
          groupSupport: this.message.groupSupport,
          destinations: this.message.destinations,
          isCampaign: this.message.isCampaign,
          isSmtp: this.message.isSmtp,
          _id: this.message._id
        });
      }),
      take(1)
    ).subscribe()
  }

  public get destinations() {
    return this.form.get('destinations') as FormArray
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

  public closeModal(): void {
    this.toggle = !this.toggle;
    if(this.campaingCode){
      this.router.navigate(['pages/list']);
    }
    this.store.dispatch(new UpdateMessage(undefined))
  }

  onCancel(){
    this.location.back();
  }

  addDestinations(){
    this.destinations.push(this.formBuilder.group({
      jsonLogic: [''],
      url: ['']
    }))
  }

  public closeAlertModal(): void {
    this.toggleAlert = !this.toggleAlert;
  }

  removeDestinations(destinations: any){
    this.destinations.removeAt(destinations)
  }
}

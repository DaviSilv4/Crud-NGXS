import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Store, Select } from '@ngxs/store';
import { Observable, Subscription, catchError, of, tap } from 'rxjs';
import { GenericModel } from 'src/app/model/generic.model';
import { ApiService } from 'src/app/service/api-service.service';
import { DeleteMenu, SetSelectedMenu, UpdateMenu } from 'src/app/store/actions/message.actions';
import { MessaegeState } from 'src/app/store/state/message.state';

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.scss']
})
export class EditFormComponent implements OnInit, OnDestroy {

  test!: GenericModel;
  selectedSub!: Subscription
  @Select(MessaegeState.selectedMenus) selectedMenu$!: Observable<GenericModel>;

  form = this.formBuilder.group({
    body: [''],
    campaignCode: [''],
    messageType: [''],
    groupSupport: [''],
    isCampaing: [true],
    isSmtp: [false],
  });

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private apiService: ApiService,
    private location: Location,
    private activateRoute: ActivatedRoute,
    private store: Store,
    private route: Router
  ) {}

  ngOnInit() {
    this.activateRoute.paramMap.pipe(
      tap((params) => {
        this.apiService.getId(params.get('id')).subscribe(params => {
          this.test = params;
          this.getMenuId(params.id)
        })
      })
    ).subscribe();
  }



  onSubmit(form: any) {
    this.store.dispatch(new UpdateMenu(form.value))
  }

  getMenuId(id: number){
    this.store.dispatch(new SetSelectedMenu(id))
    this.selectedSub = this.selectedMenu$.pipe(
      tap((res) => {
        this.test = res;
      })
    ).subscribe()
  }

  onCancel(){
    this.location.back();
  }

  ngOnDestroy() {
    this.selectedSub.unsubscribe();
  }

}

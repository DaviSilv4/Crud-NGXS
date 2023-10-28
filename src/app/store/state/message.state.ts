import { Injectable, NgZone } from '@angular/core';
import { Action, Selector, State, StateContext, createSelector } from '@ngxs/store';
import { catchError, first, map, of, take, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ApiService } from 'src/app/service/api-service.service';
import { GenericModel } from 'src/app/model/generic.model';
import { AddMessage, DeleteMenu, GetMenu, GetMessage, GetMessageTeste, SearchMenu, SetSelectedMenu, UpdateMenu } from '../actions/message.actions';
import { MessageModel } from 'src/app/model/message.model';

export class NotifcationMessageModel {
  menus!: GenericModel[];
  menusLoaded!: boolean;
  selectedMenu?: GenericModel;
  selectedMessage?: MessageModel;
  filter!: number | GenericModel;
  message!: MessageModel;
}

@State<NotifcationMessageModel>({
  name: 'menu'
})

@Injectable()
export class MessaegeState{

  constructor(
    private apiService: ApiService,
    private zone: NgZone,
    private router: Router,
    private location: Location
    ){
  }

  @Selector()
  static getMenusList(state: NotifcationMessageModel){
    return state.menus;
  }

  @Selector()
  static getMessage(state: NotifcationMessageModel){
    return state.message;
  }

  @Selector()
  static getMenusLoaded(state: NotifcationMessageModel){
    return state.menusLoaded;
  }

  @Selector()
  static selectedMenus(state: NotifcationMessageModel){
    return state.selectedMenu;
  }

  @Selector()
  static filter(state: NotifcationMessageModel){
    return state.filter;
  }

  @Action(GetMessageTeste)
  getMessageTest(ctx: StateContext<NotifcationMessageModel>, {payload}: GetMessageTeste){
    debugger
    this.apiService.getId(payload.id).pipe(
      tap(res => {
        debugger
        const state = ctx.getState();
        ctx.setState({
          ...state,
          message: res
        })
      })

    ).subscribe()
  }

  @Action(SetSelectedMenu)
  selectedMenu(ctx: StateContext<NotifcationMessageModel>, {id}: SetSelectedMenu){
    const state = ctx.getState();
    const menusList = state.message;

    if(menusList === undefined){
      return this.apiService.testSearch(id.toString()).pipe(
        tap((res) => {
          const state = ctx.getState()
          ctx.setState({
            ...state,
            message: res
          })
        })
      )
    }else{
      ctx.setState({
        ...state,
        selectedMessage: menusList
      })
    }
    return;
  }

  @Action(AddMessage)
  addMenu(ctx: StateContext<NotifcationMessageModel>, payload: AddMessage){
    return this.apiService.save(payload.payload).pipe(
      tap((res) => {
        const state = ctx.getState();

        ctx.patchState({
          menus: [...state.menus, res]
        })
      })
    )
  }

  @Action(UpdateMenu)
  updateMenu(ctx: StateContext<NotifcationMessageModel>, {payload}: UpdateMenu){
    const state = ctx.getState();
    const menuList = state.selectedMessage;

    debugger
    return this.apiService.updateIdTest("").pipe(
      tap((res) => {
        console.log(res);
        ctx.patchState({
          message: res
        });
      })
    )
  }

  @Action(SearchMenu)
  searchMenu(ctx: StateContext<NotifcationMessageModel>, {payload}: SearchMenu){
    return this.apiService.testSearch(payload.campaignCode).pipe(
      tap((res) => {
        // debugger
        console.log(res)
        const state = ctx.getState()
        ctx.setState({
          ...state,
          message: res
        })
      })
    )
  }

}

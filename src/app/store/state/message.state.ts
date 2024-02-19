import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { catchError, of, tap } from 'rxjs';
import { ApiService } from 'src/app/service/api-service.service';
import { AddMessage, GetMessage, GetMessageParam, GetMessageFailed, SetSelectedMenu, UpdateMenu, UpdateMessage, GetEvent, GetMessageId } from '../actions/message.actions';
import { MessageModel } from 'src/app/model/message.model';

export class NotifcationMessageModel {
  menus!: MessageModel[];
  selectedMessage!: MessageModel;
  message?: MessageModel | any;
  messageFailed!: string;
}

@State<NotifcationMessageModel>({
  name: 'menu'
})

@Injectable()
export class MessaegeState{

  constructor(
    private apiService: ApiService,
    ){
  }

  @Selector()
  static getMessageParam(state: NotifcationMessageModel){
    return state.message;
  }

  @Selector()
  static getMessage(state: NotifcationMessageModel){
    return state.message;
  }

  @Selector()
  static getMessageFailed(state: NotifcationMessageModel){
    return state.messageFailed;
  }


  @Selector()
  static selectedMenus(state: NotifcationMessageModel){
    return state.selectedMessage;
  }

  @Action(GetMessageFailed)
  getMessageFailed(state: NotifcationMessageModel){
    return state.messageFailed
  }

  @Action(GetEvent)
  getEvent(ctx: StateContext<NotifcationMessageModel>){
    this.apiService.getEvents().pipe(
      tap((res) => {
        const state = ctx.getState();
        if(res.length !== 0){
          ctx.setState({
            ...state,
            message: res
          })
        }
        else{
          ctx.setState({
            ...state,
            messageFailed: 'Falha ao pesquisar 😥'
          })
        }
      })
    ).subscribe();
  }

  @Action(GetMessageId)
  getEventParam(ctx: StateContext<NotifcationMessageModel>, {id}: GetMessageId){
    this.apiService.getMessage(id.messageId, "").pipe(
      tap((res) => {
        const state = ctx.getState();
        if(res.length !== 0){
          ctx.setState({
            ...state,
            message: res
          })
        }
        else{
          ctx.setState({
            ...state,
            messageFailed: 'Falha ao pesquisar 😥'
          })
        }
      }),
      catchError(() => {
        const state = ctx.getState();
        return of(
          ctx.setState({
            ...state,
            messageFailed: `Opps! Serviço pode está temporariamente indisponível😥`
          })
        );
      })

    ).subscribe()
  }

  @Action(GetMessageId)
  getMessageId(ctx: StateContext<NotifcationMessageModel>, {id}: GetMessageId){
    this.apiService.getEventsMessageId(id.messageId).pipe(
      tap((res) => {
        const state = ctx.getState();
        if(res.length !== 0){
          ctx.setState({
            ...state,
            message: res
          })
        }
        else{
          ctx.setState({
            ...state,
            messageFailed: 'Falha ao pesquisar 😥'
          })
        }
      }),
      catchError(() => {
        const state = ctx.getState();
        return of(
          ctx.setState({
            ...state,
            messageFailed: `Opps! Serviço pode está temporariamente indisponível😥`
          })
        );
      })

    ).subscribe()
  }


  @Action(GetMessage)
  getMessage(ctx: StateContext<NotifcationMessageModel>){
    this.apiService.list().pipe(
      tap((res) => {
        const state = ctx.getState();
        if(res.length){
          ctx.setState({
            ...state,
            message: res
          })
        }
        else{
          ctx.setState({
            ...state,
            messageFailed: 'Falha ao pesquisar 😥'
          })
        }
      })
    ).subscribe();
  }
  @Action(GetMessageParam)
  getMessageParam(ctx: StateContext<NotifcationMessageModel>, {id}: GetMessageParam){
    this.apiService.getMessage(id.campaignCode, id.messageType).pipe(
      tap((res) => {
        const state = ctx.getState();
        if(res.length !== 0){
          ctx.setState({
            ...state,
            message: res
          })
        }
        else{
          ctx.setState({
            ...state,
            messageFailed: 'Falha ao pesquisar 😥'
          })
        }
      }),
      catchError(() => {
        const state = ctx.getState();
        return of(
          ctx.setState({
            ...state,
            messageFailed: `Opps! Serviço pode está temporariamente indisponível😥`
          })
        );
      })

    ).subscribe()
  }

  @Action(SetSelectedMenu)
  selectedMenu(ctx: StateContext<NotifcationMessageModel>, {id}: SetSelectedMenu){
    const state = ctx.getState();
    const menusList = state.message;

    if(menusList === undefined){
      return this.apiService.getMessage(id, '').pipe(
        tap((res) => {
          const state = ctx.getState()
          ctx.setState({
            ...state,
            selectedMessage: res
          })
        })
      )
    }else{
      const index = menusList.findIndex((list: any) => list.id === id);
      ctx.setState({
        ...state,
        selectedMessage: menusList[index]
      })
      return null;
    }

  }

  @Action(AddMessage)
  addMenu(ctx: StateContext<NotifcationMessageModel>, {payload}: AddMessage){
    return this.apiService.save(payload).pipe(
      tap((res) => {
        const state = ctx.getState();
        ctx.setState({
          ...state,
          message: res
        })
      }),
      catchError((error) => {
        const state = ctx.getState();
        return of(
          ctx.dispatch(new GetMessageFailed(error)),
          ctx.setState({
            ...state,
            messageFailed: error
          })
        );
      })
    )
  }
  @Action(UpdateMenu)
  updateMenu(ctx: StateContext<NotifcationMessageModel>, {payload}: UpdateMenu){
    this.apiService.updateId(payload).pipe(
      tap((res) => {
        const state = ctx.getState();
        let menuList = state.selectedMessage;

        ctx.patchState({
          message: menuList
        });
      }),
      catchError((error) => {
        const state = ctx.getState();
        return of(
          ctx.dispatch(new GetMessageFailed(error)),
          ctx.setState({
            ...state,
            messageFailed: error
          })
        );
      })

    ).subscribe();
  }

  @Action(UpdateMessage)
  updateMessage(ctx: StateContext<NotifcationMessageModel>, {payload}: UpdateMessage){
    ctx.patchState({
      ...ctx.getState(),
      message: payload,
      messageFailed: payload
    })
  }

}

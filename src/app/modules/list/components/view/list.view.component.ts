import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription, take, tap } from 'rxjs';

import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/service/api-service.service';
import { GenericModel } from 'src/app/model/generic.model';
import { Select, Store } from '@ngxs/store';
import { GetMenu } from 'src/app/store/actions/message.actions';
import { MessaegeState } from 'src/app/store/state/message.state';

@Component({
  selector: 'app-list',
  templateUrl: './list.view.component.html',
  styleUrls: ['./list.view.component.scss']
})
export class ListViewComponent implements OnInit, OnDestroy {

  @Select(MessaegeState.getMenusList) menuList$!: Observable<GenericModel[]>;
  @Select(MessaegeState.getMenusLoaded) menuLoaded$!: Observable<GenericModel[]>;
  @Select(MessaegeState.getMessage) search$!: Observable<GenericModel>;

  menuLoadedSub!: Subscription;

  test!: GenericModel;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private store:  Store
    ){}

  ngOnInit() {
    // this.getList();
    // this.menuList$.subscribe();
    // this.search$.pipe(
    //   tap((res) => {
    //     console.log(res);
    //   })
    // ).subscribe()

    // this.search$.pipe().subscribe(res => this.test = res);




  }

  ngOnDestroy() {
    // this.menuLoadedSub.unsubscribe();
  }

  getMessage(){
    this.search$.pipe(
      tap((res) =>{
        debugger
         this.test = res
      }),
      take(1)
    ).subscribe();
  }

  updateList(id: any){
    return this.router.navigate(['pages/edit/' + id]);
  }

}

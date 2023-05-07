import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, Observable } from 'rxjs';
import { BaseServiceService } from '../rest/base-service.service';
import { GenericModel } from '../model/generic.model';
import { environment } from 'src/environments/environment.dev';
import { MessageModel } from '../model/message.model';


@Injectable({
  providedIn: 'root'
})
export class ApiService extends BaseServiceService {

  key = environment.apiKey

  constructor(private http: HttpClient) {
    super(http);
  }

  getMessage(campaignCode: string, messageType: string): Observable<MessageModel> {
    return this.get(`?key=${this.key}&campaignCode=${campaignCode}&messageType=${messageType}`);
  }

  getId(id: string | null): Observable<any>{
    return this.get(`posts/${id}`);
  }

  save(save: Partial<GenericModel>): Observable<GenericModel>{
    return this.post(`posts`, save).pipe(first());
  }

  testSearch(id: string): Observable<any>{
    return this.get(`posts/${id}`);
  }

  updateId(id: GenericModel): Observable<GenericModel>{
    return this.put(`?key=${this.key}/${id.id}`, id);
  }

  updateIdTest(id: string): Observable<MessageModel>{
    return this.put(`posts/${id}`, id);
  }
}

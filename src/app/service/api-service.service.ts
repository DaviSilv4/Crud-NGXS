import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, Observable } from 'rxjs';
import { BaseServiceService } from '../rest/base-service.service';
import { MessageModel } from '../model/message.model';
import { environment } from 'src/environments/environment.dev';


@Injectable({
  providedIn: 'root'
})
export class ApiService extends BaseServiceService {

  key = environment.apiKey

  constructor(private http: HttpClient) {
    super(http);
  }

  getMessage(campaignCode: string | null, messageType: string | null): Observable<any> {
    return this.get(`?key=${this.key}&campaignCode=${campaignCode}&messageType=${messageType}`).pipe(first());
  }

  getId(id: string | null): Observable<any>{
    return this.get(`/${id}?key=${this.key}`).pipe(first());
  }

  list(): Observable<any>{
    return this.get(`/list?key=${this.key}`).pipe(first());
  }

  save(save: Partial<MessageModel>): Observable<MessageModel>{
    return this.post(`?key=${this.key}`, save).pipe(first());
  }

  updateId(paylod: MessageModel): Observable<MessageModel>{
    return this.put(`/${paylod._id}?key=${this.key}`, paylod).pipe(first());
  }

  getEvents(): Observable<any>{
    return this.getEvent(`?key=${this.key}`);
  }

  getEventsParams(messageId: string, start: string, end: string): Observable<any>{
    return this.getEvent(`/teste?key=${this.key}`);
  }

  getEventsMessageId(messageId: string): Observable<any>{
    return this.getEvent(`/${messageId}?key=${this.key}`);
  }

}

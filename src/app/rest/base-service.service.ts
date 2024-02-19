import { Injectable } from '@angular/core';
import { HttpClient, HttpContext } from '@angular/common/http';
import { Observable, take } from 'rxjs';
import { environment } from 'src/environments/environment.dev';
import { BACKEND } from '../auth/http-request-interceptor.service';

@Injectable({
  providedIn: 'root'
})
export class BaseServiceService {

  constructor(private httpClient: HttpClient) {}

  private uri_mensage = environment.url_message;
  private url_event = environment.url_events

  private httpRequestManager(method: string, url: string, options: any): Observable<any> {
    return this.httpClient.request(method,`${this.uri_mensage}${url}`, {...options
     }).pipe(take(1));
  }

  private httpRequestEvent(method: string, url: string, options: any): Observable<any> {
    return this.httpClient.request(method,`${this.url_event}${url}`, {...options
     }).pipe(take(1));
  }

  protected post(url: string, body: any): Observable<any> {
    return this.httpRequestManager('post', url, {
      context: new HttpContext().set(BACKEND, 'api'),
      body: body
   });
  }

  protected postPromote(url: string, body: any): Observable<any> {
    return this.httpRequestManager('post', url, {
      context: new HttpContext().set(BACKEND, 'api'),
      body: body
   });
  }

  protected get(url: string, params?: any): Observable<any> {
    return this.httpRequestManager('get', url, {
      context: new HttpContext().set(BACKEND, 'api'),
      params: params
    }, );
  }

  protected put(url: string, body: any): Observable<any> {
    return this.httpRequestManager('put', url, {
      context: new HttpContext().set(BACKEND, 'api'),
      body: body
    });
  }

  protected getEvent(url: string, params?: any): Observable<any> {
    return this.httpRequestEvent('get', url, {
      context: new HttpContext().set(BACKEND, 'api'),
      params: params
    }, );
  }

  protected postEvent(url: string, body: any): Observable<any> {
    return this.httpRequestEvent('post', url, {
      context: new HttpContext().set(BACKEND, 'api'),
      body: body
   });
  }

}

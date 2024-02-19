import { AuthApiService } from './auth-api.service';
import { ApiService } from 'src/app/service/api-service.service';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpContextToken } from '@angular/common/http';
import { Observable } from 'rxjs';

export const BACKEND = new HttpContextToken<string>(() => '');

@Injectable({
  providedIn: 'root'
})
export class HttpsRequestInterceptor implements HttpInterceptor {

  constructor(private apiService: ApiService,private authApiService: AuthApiService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const backend = request.context.get(BACKEND);
    if(backend == 'api'){
      const localtoken = this.authApiService.getToken();
      const req = request.clone({
        setHeaders: {
          'Authorization': 'Bearer ' +  localtoken.token,
          'Content-Type': 'application/json; charset=utf-8',
          'Accept': 'application/json',
          'X-Company-Id': '01',
          'X-Application-Id': '01',
          'X-User-Id': '01',
          'X-Trace-Id': '01'
        }
      });
      return next.handle(req);
    }
    return next.handle(request);
  }

}

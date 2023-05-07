import { AuthApiService } from './auth-api.service';
import { ApiService } from 'src/app/service/api-service.service';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Authorize_code {
  token: string;
  expiration: number;
}

@Injectable({
  providedIn: 'root'
})
export class HttpsRequestInterceptor implements HttpInterceptor {

  constructor(private apiService: ApiService,private authApiService: AuthApiService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // const token = localStorage.setItem('ola', 'hello');
    const Localtoken = this.authApiService.getToken();
    // debugger
    request = request.clone({
      setHeaders: {
        'Authorization': 'Bearer ' + "eyJraWQiOiI0Zjk2MGEyMTEyNWZmYzgwNmU2YzA5YzdlNWI4MzQ1OWFmMDY4NzdkIiwidHlwIjoiSldUIiwiYWxnIjoiUlMyNTYifQ.eyJvcmdhbml6YXRpb25JZCI6IjAiLCJzdWIiOiJoZGktY29ycG9yYXRlLWF1dGhAaW5zLWNyb3NzLXNlY3VyaXR5LWF1dGgtZGV2LmlhbS5nc2VydmljZWFjY291bnQuY29tIiwiYXVkIjoiYXBpLmhkaS5jb20uYnIiLCJjb21wYW55SWQiOiIwMCIsInJvbGVzIjpbIlJvbGUxIiwiUm9sZTIiLCJSb2xlTiJdLCJpc3MiOiJoZGktY29ycG9yYXRlLWF1dGhAaW5zLWNyb3NzLXNlY3VyaXR5LWF1dGgtZGV2LmlhbS5nc2VydmljZWFjY291bnQuY29tIiwiZXhwIjoxNjgzMzIzMzk5LCJhcHBsaWNhdGlvbklkIjoiMDAiLCJpYXQiOjE2ODMzMTk3OTksInVzZXIiOiJhcGktaW5zLWludGVncmF0aW9uLWludGVybmFsLWFjY2VzcyIsIndlYkNsaWVudCI6ImFwaS5oZGkuY29tLmJyIn0.TYeNcKoW7-SKL7fnvfmFbnd10q-FtF1MPV34IeNxKGd2xL3L4y_ppLM9LB9bbMk6-ShqDCUAFhwiU6PJK2QwiTxdTftSomwlbjJLQ81n-tgL_hx9eBrtDzaI5dj5tHdwwAozrja3wFdnigQjyRx3EDXAiEGjegQ6aDe5i2ZZabSnFfxW_yRf-z9KlxyuYbqhXW2riEsLBAh5ZzAWixdW-BgeBwkS2FVBUUen4ONGL6eTqMzpSXh5teFItT-fuE85Ae_G9--c-Dpv1xLseJFWXklQ3K9B-cvGNL3hEVVVdB2ZGq-C678CQZDzEPEPcxP6YUBQXuE9P-_livn5K4Wqhw",
        'Content-Type': 'application/json; charset=utf-8',
        'Accept': 'application/json',
        'X-Company-Id': '01',
        'X-Application-Id': '01',
        'X-User-Id': '01',
        'X-Trace-Id': '01'
      }
    });
    return next.handle(request);
  }

}

import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { tap } from "rxjs";
import { environment } from "src/environments/environment.dev";

interface Authorize_code {
  token: string;
  expiration: number;
}

@Injectable({
  providedIn: 'root'
})

export class AuthApiService {
  httpAPIAuth;

  auth = 'corporate/security/v1/authorize?key'
  key = 'AIzaSyA3cRm_CHBCT1c4adDRRUqkrchj_hyas-E'
  constructor(private http: HttpClient) {
    this.httpAPIAuth = {
      async: false,
      headers: new HttpHeaders({
        'X-Company-Id': '01',
        'X-Application-Id': '010001',
        'X-User-Id': '01',
        'X-Trace-Id': '01'
      })
    }
  }

  authorize() {
    this.token()
  }

  private token(): void {
    // debugger
    let body_auth = {};
    let auth;
    this.http.post<Authorize_code>(
      this.auth + this.key,
      body_auth, this.httpAPIAuth).pipe(
        tap(data => {
          this.writeToken(data);
          setInterval(() => {
            this.refreshToken();
          }, (data.expiration - 10) * 100)
        })
      ).subscribe();
  }

  private refreshToken(): void {
    const authorize_code = JSON.parse(sessionStorage.getItem("test") || '{}');
    if (authorize_code?.token != null) {
      let promise = new Promise((resolve, reject) => {
        const body_auth = {
          token: authorize_code?.token
        };
        this.http.post<Authorize_code>(
          this.auth + this.key,
          body_auth, this.httpAPIAuth).subscribe(data => {
            this.writeToken(data);
          });
      });
      promise.finally(() => {});
    }
  }

  getToken(): Authorize_code {
    const authorize_code = JSON.parse(sessionStorage.getItem("test") || '{}');
    return authorize_code || null;
  }

  private writeToken(authorize_code: Authorize_code) {
    sessionStorage.setItem("test", JSON.stringify(authorize_code));
  }

}

import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";
import { sha256 } from "js-sha256";
import { tap } from "rxjs";

const API_DATA = sha256.hmac('api', 'api');
const jwt = new JwtHelperService();


interface AuthorizeCode {
  token: string;
  expiration: number;
}

@Injectable({
  providedIn: 'root'
})

export class AuthApiService {
  httpAPIAuth;

  auth = '/corporate/security/v1/authorize?key='
  tokenAuth = '/corporate/security/v1/token?key='
  key = 'AIzaSyA3cRm_CHBCT1c4adDRRUqkrchj_hyas-E'
  constructor(private http: HttpClient) {
    this.httpAPIAuth = {

      headers: new HttpHeaders({
        'X-Company-Id': '01',
        'X-Application-Id': '010001',
        'X-User-Id': '01',
        'X-Trace-Id': '01'
      })
    }
  }

  authorize() {
    if (this.getToken()?.token == null) {
      this.token();
    }else{
      if (this.isExpired()) {
        this.token();
      }
    }
  }

  token(){
    let body_auth = {
      "clientId": "api-ins-integration-internal-access",
      "clientSecret": "fcea5888076e1cd5ffa2f95f5ff21f7f8d9402bf1ff7d84f63bccf6ee6704d50",
      "grantType": "client_credentials"
    };

    this.http.post<AuthorizeCode>(
      `${this.auth}${this.key}`,
      body_auth, this.httpAPIAuth).pipe(
        tap((authorize) => {
          this.writeToken(authorize);
          this.refreshToken();
        })
      ).subscribe();
  }

  private refreshToken(): void {
    const authorize_code = JSON.parse(sessionStorage.getItem(API_DATA) || '{}');

    this.http.post<AuthorizeCode>(
      `${this.tokenAuth}${this.key}`,
      authorize_code, this.httpAPIAuth).pipe(
        tap((response) => {
          this.writeToken(response);
      })
    ).subscribe();
  }

  getToken(): AuthorizeCode {
    const authorize_code = JSON.parse(sessionStorage.getItem(API_DATA) || '{}');
    return authorize_code;
  }

  private writeToken(authorize_code: AuthorizeCode) {
    sessionStorage.setItem(API_DATA, JSON.stringify(authorize_code));
  }

  private isExpired() {
    let tokenJwt = this.getToken().token;
    return jwt.isTokenExpired(tokenJwt);
  }
}

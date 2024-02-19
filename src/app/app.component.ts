import { AuthApiService } from './auth/auth-api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'notification-message-element',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  constructor(private authApiService: AuthApiService){}

  ngOnInit(): void {
    // this.authApiService.authorize();

  }
}

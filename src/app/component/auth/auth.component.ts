import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { setCookie } from '../../../assets/scripts/setCookie';
import { AuthService } from './auth.service';
import { stringify } from 'querystring';
import { User } from './user';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  user: User[];

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  //log in by retrieving user from database and setting cookies
  login(username: string, password: string): void {

    this.authService.logIn(username, password).subscribe(
      user => {this.user = user;
      console.log(this.user);
        if(this.user['status'] == 'invalid'){
          document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
          $('#bad-login').css('display', 'block');
        }
        else if(this.user['status'] == 'valid'){
          setCookie('userID', this.user['_id'], 1);
          setCookie('username', this.user['username'], 1);
          window.location.href="/memories";
        }
      });

  }

}

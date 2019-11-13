import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  login(email: string, password: string): void {
    //console.log($('#sign-in-email').val());

    console.log(email);
    console.log(password);

  }

}

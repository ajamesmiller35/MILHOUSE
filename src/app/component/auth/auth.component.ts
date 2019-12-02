import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { setCookie } from '../../../assets/scripts/setCookie';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  login(username: string, password: string): void {
    //console.log($('#sign-in-email').val());

    let data = {
      username: username,
      password: password
    };

    $.ajax({
      url: 'http://localhost:3000/api/users',
      type: 'POST',
      accept: 'application/json',
      crossDomain: true,
      data: {
        username: username,
        password: password
      },
      success: function(request){
        console.log(request);
        if(request.message){
          $('#bad-login').css('display', 'block');
        }
        else if(request._id){
          setCookie('userID', request._id, 1);
          setCookie('username', request.username, 1);
          window.location.href="/memories";
        }
        else{
          $('#bad-login').html('Server Error!');
          $('#bad-login').css('display', 'block');
        }
        
      },
      error: function(){
        
      } 
    });

  }

}

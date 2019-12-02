import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.scss']
})
export class NewAccountComponent implements OnInit {

  constructor() { }

  newAccount(username: string, password: string, password2: string){

    if(password !== password2){
      $('#bad-login').html('Passwords do not match!');
      $('#bad-login').css('display', 'block');
    }

    /*let data = {
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
    });*/
  }

  ngOnInit() {
  }

}

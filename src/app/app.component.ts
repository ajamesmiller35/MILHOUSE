import { Component } from '@angular/core';
import {Location} from '@angular/common';
import * as $ from 'jquery';
import { getCookie } from '../assets/scripts/getCookie';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'MILHOUSE';

  constructor(private _location: Location) {}

  goBack() {
    this._location.back();
  }

  logOut() {
    document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
    window.location.href="/auth"
  }

  ngOnInit() {
    var push = $('nav').height();
    $('.push').css('height', push);
  }
}

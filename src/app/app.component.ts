import { Component } from '@angular/core';
import {Location} from '@angular/common';
import * as $ from 'jquery';

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

  ngOnInit() {
    var push = $('nav').height();
    $('.push').css('height', push);
  }
}

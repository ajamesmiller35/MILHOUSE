import { Component } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'MILHOUSE';

  ngOnInit() {
    var push = $('nav').height();
    $('.push').css('height', push);
  }
}

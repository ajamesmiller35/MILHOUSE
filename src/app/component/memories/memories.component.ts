import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-memories',
  templateUrl: './memories.component.html',
  styleUrls: ['./memories.component.scss']
})
export class MemoriesComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    $('#add').on('click', function(){
      $('.add-memory').css('display','block');
      $('#add').css('display', 'none');
      $('#remove').css('display', 'block');
    });

    $('#remove').on('click', function(){
      $('.add-memory').css('display','none');
      $('#remove').css('display', 'none');
      $('#add').css('display', 'block');
    });
    
  }

}

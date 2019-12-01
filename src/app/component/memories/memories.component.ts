import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { getCookie } from '../../../assets/scripts/getCookie';
import { MemData } from './memory.model';

@Component({
  selector: 'app-memories',
  templateUrl: './memories.component.html',
  styleUrls: ['./memories.component.scss']
})
export class MemoriesComponent implements OnInit {

  userID: String;
  username: String;
  memories: MemData;

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

    if(getCookie('userID')){
      this.username = getCookie('username');
      this.userID = getCookie('userID');
    }

    $.ajax({
      url: 'http://localhost:3000/api/memories',
      type: 'GET',
      accept: 'application/json',
      success: function(request){
        console.log(request);
        this.memories = request;
        for(let x = 0; x < this.memories.length; x++){
          $('#memory-box').append(`<div class="memory-title-box">
          <h3 style="display: inline;" class="memory-title text-white text-center syncopate">` + this.memories[x].title + `</h3><h3 style="display: inline;" class="memory-title text-white text-center syncopate"> - </h3><h3 style="display: inline;" class="memory-title text-white text-center syncopate">` + this.memories[x].date + `</h3>
        </div><!--memory-title-box-->
          <div class="row">
            <div class="col-lg-6">
              <img class="memory-img" style="width: 100%;" src="../../../assets/images/` + this.memories[x].img + `" alt="">
            </div><!--col-lg-6-->
            <div class="col-lg-6">
              <p class="text-white">` + this.memories[x].description + `</p>
            </div><!--col-lg-6-->
          </div><!--row-->`);
        }
      }
    });
    
  }

}

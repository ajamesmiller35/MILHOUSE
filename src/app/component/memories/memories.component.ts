import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { getCookie } from '../../../assets/scripts/getCookie';
import { MemData } from './memory.model';
import { HttpClient } from '@angular/common/http';

var count = null;

@Component({
  selector: 'app-memories',
  templateUrl: './memories.component.html',
  styleUrls: ['./memories.component.scss']
})
export class MemoriesComponent implements OnInit {

  userID: string;
  username: string;
  memories: MemData;
  selectedFile: File = null;
  fileName: string = '';

  triggerInput(){
    console.log('CLICKED');
    $('#upload-input').trigger('click');
  }

  onFileSelected(event){
    this.selectedFile = <File>event.target.files[0];
    console.log(this.selectedFile);
    this.fileName = this.selectedFile.name;
    const fd = new FormData();
    fd.append('image', this.selectedFile, this.selectedFile.name)
    this.http.post('http://localhost:3000/api/upload', fd, {responseType: 'text'})
      .subscribe(res => {
        console.log('UPLOADED');
        $('.add-img-box').css('display', 'none');
        $('.new-image').css('background-image', 'url(../../../assets/images/' + this.fileName + ')');
        $('.new-image').css('display', 'block');
      });
  }

  addMemory() {
    let creator = this.username;
    let title = $('#nm-title').html();
    let date = $('#nm-date').html();
    let description = $('#nm-details').html();
    let img = this.fileName;
    let number = 0;

    $.ajax({
      url: 'http://localhost:3000/api/memories/largest',
      type: 'GET',
      accept: 'application/json',
      success: function(request){
        number = request.number;
        number++;
        console.log(number);
      }
    }).done(function(){
      $.ajax({
        url: 'http://localhost:3000/api/memories/add',
        type: 'POST',
        data: {
          creator: creator,
          title: title,
          date: date,
          description: description,
          img: img,
          number: number
        },
        accept: 'application/json',
        success: function(request){
          console.log('SUCCESS');
        }
      });
    });

  }

  getLargest(){

  }

  getMemories(){

    if(count == null){
      $.ajax({
        url: 'http://localhost:3000/api/memories/largest',
        type: 'GET',
        accept: 'application/json',
        success: function(request){
          count = request.number;
          console.log(count);
        }
      }).done(function(){
        $.ajax({
          url: 'http://localhost:3000/api/memories',
          data: { number: count },
          type: 'POST',
          accept: 'application/json',
          success: function(request){
            console.log(request);
            console.log("THIS NUMBER: " + count);
            this.memories = request;
            for(let x = this.memories.length-1; x >= 0; x--){
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
            count-=3;
            console.log('NEW COUNT' + count);
          }
        });
      });
    }
    else{
      $.ajax({
        url: 'http://localhost:3000/api/memories',
        data: { number: count },
        type: 'POST',
        accept: 'application/json',
        success: function(request){
          console.log(request);
          console.log("THIS NUMBER: " + count);
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
          count-=3;
          console.log('NEW COUNT' + count);
        }
      });
    }

    }

    checkStatus(){
      if(!getCookie('userID')){
        window.location.href = "/auth";
      }
    }

  constructor(private http: HttpClient) { }

  ngOnInit() {

    this.checkStatus();

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

    this.getMemories();

  }

}

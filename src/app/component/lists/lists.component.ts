import { Component, OnInit, Input } from '@angular/core';
import { List } from './list';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import * as $ from 'jquery';
import { getCookie } from '../../../assets/scripts/getCookie';
import { eraseContent } from '../../../assets/scripts/eraseContent';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss']
})
export class ListsComponent implements OnInit {

  lists: List[];
  @Input()
  id: string;
  userID: string;
  username: string;

  constructor(private route: ActivatedRoute) { }

  /*ngOnChanges(changes: SimpleChanges) {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id);
  }*/

  delete(id){
    console.log("DELETE: " + id);
  }

  addList(){
    let title = $('#new-list-title').html();
    let items = $('#new-list-items').text();

    console.log(title);
    console.log(items);
  }

  appendNext(){
    let children = $('#new-list-item-box').length + 1;
    $('.new-list-item-box').append(`<h6 contenteditable="true" style="padding-top:10px; padding-bottom:10px;" (click)="console.log('test')" class="new-list-item syncopate text-white" id="` + children + `">New List Items</h6>`);
  }

  ngOnInit() {
    eraseContent();
    if(getCookie('userID')){
      this.username = getCookie('username');
      this.userID = getCookie('userID');
    }

    var lists = new Array();

    lists.push({'id': 1, 'name': 'Groceries'});
    lists.push({'id': 2, 'name': 'Hardware'});
    lists.push({'id': 3, 'name': 'Pharmacy'});

    console.log(lists);
    this.lists = lists;

    //this.id = this.route.snapshot.paramMap.get('id');

    //const queryParams = this.route.snapshot.queryParams;
    const routeParams = this.route.snapshot.params;

    //console.log(queryParams);
    console.log(routeParams);

    this.route.params.subscribe(routeParams => {
      this.id = routeParams.id;

      $('#add').on('click', function(){
        $('.add-list').css('display','block');
        $('#add').css('display', 'none');
        $('#remove').css('display', 'block');
      });

      $('#remove').on('click', function(){
        $('.add-list').css('display','none');
        $('#remove').css('display', 'none');
        $('#add').css('display', 'block');
      });
    });

  }

}

import { Component, OnInit, Input } from '@angular/core';
import { List } from './list';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import * as $ from 'jquery';
import { getCookie } from '../../../assets/scripts/getCookie';
import { eraseContent } from '../../../assets/scripts/eraseContent';
import { ListService } from './list.service';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss']
})
export class ListsComponent implements OnInit {

  lists: List[];
  items: Array<string>;
  @Input()
  id: string;
  userID: string;
  username: string;

  constructor(private route: ActivatedRoute, private listService: ListService) { }

  addList(){
    let title = $('#new-list-title').html();
    let children = document.getElementById("nlib").childElementCount - 1;
    let items = Array();

    for(let x = 0; x < children; x++){
      items[x] = document.getElementById(String(x+1)).innerHTML;
    }

    console.log(title);
    console.log(items);

    $.ajax({
      url: 'http://localhost:3000/api/lists/newlist',
      data: {
        title: title,
        items: items,
        creator: this.username
      },
      type: 'POST',
      accept: 'application/json',
      success: function(){
        location.reload();
      },
    });
  }

  appendNext(){
    let children = document.getElementById("nlib").childElementCount;
    console.log(children);
    $('.new-list-item-box').append(`<h6 contenteditable="true" style="padding-top:10px; padding-bottom:10px;" (click)="console.log('test')" class="new-list-item syncopate text-white" id="` + children + `">New List Items</h6>`);
  }

  getLists(): void{

    this.listService.getLists().subscribe(lists => {this.lists = lists;
      for(let x = 0; x < this.lists.length; x++){
        if(this.id == this.lists[x]._id){
          this.items = this.lists[x].items;
        }
      }
    });

  }

  deleteItem(item): void{
    console.log('ITEM TO DELETE: ' + item);
    this.items = this.items.filter(l => l !== item);
    this.listService.deleteItem(this.id, item).subscribe();
  }

  deleteList(list, listID): void{
    this.lists = this.lists.filter(ln => ln !== list);
    this.listService.deleteList(listID).subscribe();
  }

  checkStatus(){
    if(!getCookie('userID')){
      window.location.href = "/auth";
    }
  }

  ngOnInit() {
    this.checkStatus();
    eraseContent();
    if(getCookie('userID')){
      this.username = getCookie('username');
      this.userID = getCookie('userID');
    }

    const routeParams = this.route.snapshot.params;

    //console.log(queryParams);
    console.log(routeParams);

    this.route.params.subscribe(routeParams => {
      this.id = routeParams.id;
      console.log('ROUTE CHANGED');
      try{
        for(let x = 0; x < this.lists.length; x++){
          if(this.id == this.lists[x]._id){
            this.items = this.lists[x].items;
          }
        }
      }
      catch{
        console.log('length undefined');
      }

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

    this.getLists();
    //this.getListItems(this.id);

    /*var lists = new Array();

    lists.push({'id': 1, 'name': 'Groceries'});
    lists.push({'id': 2, 'name': 'Hardware'});
    lists.push({'id': 3, 'name': 'Pharmacy'});

    console.log(lists);
    this.lists = lists;
    */
    //this.id = this.route.snapshot.paramMap.get('id');

    //const queryParams = this.route.snapshot.queryParams;

  }

}

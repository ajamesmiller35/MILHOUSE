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
  title: string;
  userID: string;
  username: string;

  constructor(private route: ActivatedRoute, private listService: ListService) { }

  //adds list to database
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

  //adds an additional contenteditable field allowing user to add another list item when adding a new list
  appendNext(){
    let children = document.getElementById("nlib").childElementCount;
    console.log(children);
    $('.new-list-item-box').append(`<h6 contenteditable="true" style="padding-top:10px; padding-bottom:10px;" (click)="console.log('test')" class="new-list-item syncopate text-white" id="` + children + `">New List Items</h6>`);
  }

  //adds an additional contenteditable field allowing user to add another list item when editing a list
  appendNextItem() {
    this.items.push('New Item');
  }

  //saves changes to a list made when editing
  saveItemChanges() {
    console.log(this.items);
    let newItems = Array();
    let x = 0;
    $('.item-title').each(function(){
      newItems[x] = this.innerHTML;
      x++;
    });
    this.items = newItems;
    this.listService.updateList(this.id, this.items).subscribe(items => {location.reload()});
  }

  //retrieves all lists from the database and sets items
  getLists(): void{
    this.listService.getLists().subscribe(lists => {this.lists = lists;
      for(let x = 0; x < this.lists.length; x++){
        if(this.id == this.lists[x]._id){
          this.items = this.lists[x].items;
        }
      }
    });

  }

  //deletes item from database
  deleteItem(item): void{
    console.log('ITEM TO DELETE: ' + item);
    this.items = this.items.filter(l => l !== item);
    this.listService.deleteItem(this.id, item).subscribe();
  }

  //deletes entire list from database
  deleteList(list, listID): void{
    this.lists = this.lists.filter(ln => ln !== list);
    this.listService.deleteList(listID).subscribe();
  }

  //checks if user is authenticated. if not, redirects to auth page.
  checkStatus(){
    if(!getCookie('userID')){
      window.location.href = "/auth";
    }
  }

  ngOnInit() {
    //checks login status
    this.checkStatus();

    //automatically deletes contents of contenteditable fields when they are clicked
    eraseContent();

    //checks if cookies are set, sets username and id variables from cookies
    if(getCookie('userID')){
      this.username = getCookie('username');
      this.userID = getCookie('userID');
    }

    //sets list items from currently selected list
    this.route.params.subscribe(routeParams => {
      this.id = routeParams.id;
      this.title = routeParams.title;
      try{
        for(let x = 0; x < this.lists.length; x++){
          if(this.id == this.lists[x]._id){
            this.items = this.lists[x].items;
          }
        }
      }
      catch{ }

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

  }

}

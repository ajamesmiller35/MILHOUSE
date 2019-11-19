import { Component, OnInit, OnChanges, Input, SimpleChanges } from '@angular/core';
import { List } from './list';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss']
})
export class ListsComponent implements OnInit, OnChanges {

  lists: List[];
  @Input()
  id: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    var lists = new Array();

    lists.push({'id': 1, 'name': 'Groceries'});
    lists.push({'id': 2, 'name': 'Hardware'});
    lists.push({'id': 3, 'name': 'Pharmacy'});
    console.log(lists);
    this.lists = lists;
  }

  ngOnChanges(changes: SimpleChanges) {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id);
  }

}

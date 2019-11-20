import { Component, OnInit, Input } from '@angular/core';
import { List } from './list';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss']
})
export class ListsComponent implements OnInit {

  lists: List[];
  @Input()
  id: string;

  constructor(private route: ActivatedRoute) { }

  /*ngOnChanges(changes: SimpleChanges) {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id);
  }*/

  ngOnInit() {
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
    });

  }

}

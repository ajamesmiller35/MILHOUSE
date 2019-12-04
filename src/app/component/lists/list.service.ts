import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';

import { List } from './list';

const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };

@Injectable({ providedIn: 'root' })
export class ListService {

  private getListsURL = 'http://localhost:3000/api/lists';  // URL to web api
  private deleteItemURL = 'http://localhost:3000/api/lists/items/delete';
  private deleteListURL = 'http://localhost:3000/api/lists/delete';
  private updateListURL = 'http://localhost:3000/api/lists/update';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getLists (): Observable<List[]> {
    return this.http.get<List[]>(this.getListsURL);
  }

  deleteItem (listID: string, item: string): Observable<string> {
    return this.http.post<string>(this.deleteItemURL, {listID: listID, item: item}, httpOptions);
  }

  deleteList (listID: string): Observable<string> {
      return this.http.post<string>(this.deleteListURL, {listID: listID}, httpOptions);
  }

  updateList (listID: string, list: Array<string>): Observable<Array<string>> {
    return this.http.post<Array<string>>(this.updateListURL, {listID: listID, list: list}, httpOptions);
  }

}

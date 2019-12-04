import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';

import { User } from './user';

const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };

@Injectable({ providedIn: 'root' })
export class AuthService {

  private logInURL = 'http://localhost:3000/api/users';  // URL to web api

  constructor(private http: HttpClient) { }

  logIn (username: string, password: string): Observable<User[]> {
    return this.http.post<User[]>(this.logInURL, {username: username, password: password}, httpOptions);
  }

}

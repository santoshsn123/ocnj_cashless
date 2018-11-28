import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { Store } from '@ngrx/store';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  dataString: string;
  constructor(private http: HttpClient, private store: Store<any>) { }
  getUsers() {
    return this.http.get('https://jsonplaceholder.typicode.com/users')
  }
  getUser(userId) {
    return this.http.get('https://jsonplaceholder.typicode.com/users/' + userId)
  }


  getPosts() {
    return this.http.get('https://jsonplaceholder.typicode.com/posts')
  }

  getLoginState() {
    return this.store.select('appReducer');
  }


  
  setPageasLogin(obj) {
    this.store.dispatch({ type: obj.action,payload:{} });
  }

  setLoginDetails(obj)
  {
    this.store.dispatch({ type: obj.action,payload:obj.user });
  }

}

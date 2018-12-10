import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  baseUrl = "http://localhost:3000/api";
  constructor(private http: HttpClient) { }
  
  submitLogin(Object) {
    return this.http.post(this.baseUrl + '/v1/admin/login', Object);
  }

  getAllUsers() {
    return this.http.get(this.baseUrl + '/v1/admin/users');
  }
  saveUser(Object){
    return this.http.post(this.baseUrl + '/v1/register',Object);
  }
}

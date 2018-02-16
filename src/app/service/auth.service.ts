import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import * as jwtDecode from 'jwt-decode';
import { Headers, RequestOptions } from '@angular/http';


@Injectable()
export class AuthService {

  BASE_URL = 'http://localhost:4201/auth'

  constructor(private http:Http) { }

  login(credentials) {
    return this.http.post(this.BASE_URL + '/login', credentials)
                    .map(res => res.json());
  }

  userIsLogin() {
    return !!localStorage.getItem('jbb-data');
  }

  logout() {
    localStorage.removeItem('jbb-data');
  }

  register(credentials) {
    return this.http.post(this.BASE_URL + '/register', credentials)
             .map(res => res.json());
  }

  addAuthorizationHeader(token) {
    const authorizationHeader = new Headers({
       'Authorization' : 'Bearer ' + token
    });

    return new RequestOptions({headers: authorizationHeader});
  }

  decodeToken(token) {
    return jwtDecode(token);
  }
}

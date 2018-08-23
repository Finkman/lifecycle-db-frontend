import { Injectable } from '@angular/core';
import { Md5 } from 'ts-md5/dist/md5';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import 'rxjs/add/operator/map';
import { appConfig } from './app.config';

import { User, AccessLevel } from './models/user';
import { tap, catchError } from 'rxjs/operators';

const baseUrl = appConfig.userBaseUrl;
const authenticateUrl = `${baseUrl}/authenticate.php`;
const userListUrl = `${baseUrl}/userList.php`;
const addUserUrl = `${baseUrl}/addUser.php`;

const httpOptions = {
  headers: new HttpHeaders(
    { 'Content-Type': 'application/json', 'Authorization': 'my-auth-token' })
};

@Injectable()
export class AuthenticationService {
  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    let hash = Md5.hashStr(password) as string;
    let formData = new FormData();
    formData.append('username', username);
    formData.append('passwordHash', hash);
    return this.http.post<any>(authenticateUrl, formData).map(user => {
      // it was successful
      console.log(user);
      if (user && user.token) {
        // store it in local storage
        console.log("authService: store user");
        let reUser = user as User;
        localStorage.setItem('currentUser', JSON.stringify(user));
      }

      return user;
    });
  }

  reload() {
    return this.http.get<User>(authenticateUrl).map(user => {
      if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
      }

      return user;
    });
  }

  logout() {
    if (this.isLoggedOn()) {
      localStorage.removeItem('currentUser');
    }
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error);  // log to console instead

      // TODO: better job of transforming error for user consumption
      // this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  isLoggedOn(): boolean {
    let user = this.getCurrentUser();
    return user && user.level != AccessLevel.None;
  }

  getCurrentUser(): User {
    let storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      return JSON.parse(storedUser) as User;
    } else {
      return null;
    }
  }

  getUserList(): Observable<User[]> {
    if (!this.isLoggedOn()) {
      Observable.throw('access denied');
    }

    return this.http.get<User[]>(userListUrl);
  }

  addUser(entry: User): Observable<User> {
    // if(localStorage.getItem['currentUser'] )
    return this.http.post<User>(addUserUrl, entry, httpOptions)
      .pipe(
        tap(entry => console.log(`added user ${entry.username}`)),
        catchError(this.handleError<User>('addDeviceEntry')));
  }
}

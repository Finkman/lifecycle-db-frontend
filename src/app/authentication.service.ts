import {Injectable} from '@angular/core';
import {Md5} from 'ts-md5/dist/md5';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';
import {appConfig} from './app.config';

import {User, AccessLevel} from './models/user';

const baseUrl = appConfig.userBaseUrl;
const authenticateUrl = `${baseUrl}/authenticate.php`;
const userListUrl = `${baseUrl}/userList.php`;

@Injectable()
export class AuthenticationService {
  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    let hash = Md5.hashStr(password);
    return this.http
        .post<any>(authenticateUrl, {username: username, passwordHash: hash})
        .map(user => {
          // it was successful
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
}

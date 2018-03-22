import {Injectable} from '@angular/core';
import {Md5} from 'ts-md5/dist/md5';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {appConfig} from './app.config';

const baseUrl = appConfig.userBaseUrl;
const authenticateUrl = `${baseUrl}/authenticate.php`;

@Injectable()
export class AuthenticationService {
  constructor(private http: HttpClient) {}

  login(username: string, password: string){
    let hash = Md5.hashStr(password);
    return this.http.post<any>(authenticateUrl, {username: username, passwordHash: hash})
    .map(user => {
      // it was successful
      if(user && user.token){
        // store it in local storage
        console.log("authService: store user");
        localStorage.setItem('currentUser', JSON.stringify(user));
      }

      return user;
    });
  }

  logout(){
    localStorage.removeItem('currentUser');
  }
}

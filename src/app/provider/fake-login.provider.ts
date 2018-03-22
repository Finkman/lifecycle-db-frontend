import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/materialize';
import 'rxjs/add/operator/dematerialize';

import { User } from '../models/user';

@Injectable()
export class FakeLoginProvider implements HttpInterceptor {
  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler):
      Observable<HttpEvent<any>> {
    // local storage of users on backend
    let users: any[] = JSON.parse(localStorage.getItem('users')) || [];

    return Observable.of(null)
        .mergeMap(() => {

          if (request.url.endsWith('/api/authenticate.php') &&
              request.method === 'POST') {
            console.log(`fake: login requested`);
            // find if any user matches login
            let filteredUsers = users.filter(user => {
              return user.username === request.body.username &&
                  user.password === request.body.password;
            });

            if (filteredUsers.length) {
              // if login details are valid, return 200 with user details and
              // token
              let user = filteredUsers[0];
              let body = {
                id: user.id,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                token: 'fake-jwt-token'
              };

              return Observable.of(new HttpResponse({status: 200, body: body}));
            } else {
              return Observable.throw('Username or password is incorrect');
            }
          }

          return next.handle(request);
        })
        .materialize()
        .delay(500)
        .dematerialize();
  }
}

let fakedUsers : User[] = [
  {_id: "id1", username: "admin", password: "1234", firstName: "Sven", lastName: "Fink"}
];

export let fakeLoginProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: FakeLoginProvider,
  multi: true
};
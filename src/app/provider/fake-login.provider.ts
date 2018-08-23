import { Injectable } from '@angular/core';
import { Md5 } from 'ts-md5/dist/md5';
import {
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
import { User, AccessLevel } from '../models/user';

@Injectable()
export class FakeLoginProvider implements HttpInterceptor {
  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    return of(null).pipe(
      mergeMap(() => {

        if (request.url.endsWith('/api/authenticate.php') &&
          request.method === 'POST') {
          // console.log(`fake: login requested for
          // ${request.body.passwordHash}`);
          // find if any user matches login
          let filteredUsers = fakedUsers.filter(user => {
            return user.username === request.body.username &&
              user.passwordHash === request.body.passwordHash;
          });

          if (filteredUsers.length) {
            console.log(`fake: login does match -> success`);
            // if login details are valid, return 200 with user details and
            // token
            let user = filteredUsers[0];
            let body = {
              id: user._id,
              username: user.username,
              firstName: user.firstName,
              lastName: user.lastName,
              token: 'fake-jwt-token',
              level: user.level,
            };

            return of(new HttpResponse({ status: 200, body: body }));
          } else {
            console.log(`fake: login does not match`);
            return throwError('Username or password is incorrect');
          }
        }

        if (request.url.endsWith('/api/userList.php')) {
          return of(new HttpResponse({ status: 200, body: fakedUsers }));
        }

        return next.handle(request);
      }),
      materialize(), delay(500), dematerialize());
  }
}

let fakedUsers: User[] = [
  {
    _id: "id1",
    username: "admin",
    passwordHash: `${Md5.hashStr("1234")}`,
    firstName: "Svenson",
    lastName: "Fink",
    email: "fink@piclife.de",
    level: AccessLevel.Creator,
  },
  {
    _id: "id2",
    username: "Finkman",
    passwordHash: `${Md5.hashStr("1234")}`,
    firstName: "Sven",
    lastName: "Fink",
    email: "sven.fink@piclife.de",
    level: AccessLevel.Creator,
  },
  {
    _id: "id3",
    username: "Tester",
    passwordHash: `${Md5.hashStr("1234")}`,
    firstName: "Max",
    lastName: "Musterman",
    email: "finks@piclife.de",
    level: AccessLevel.Visitor,
  },
];

export let fakeLoginProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: FakeLoginProvider,
  multi: true
};
import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/materialize';
import 'rxjs/add/operator/dematerialize';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor{

  constructor(){}

  intercept(request: HttpRequest<any>, next: HttpHandler) : Observable<HttpEvent<any>>{

    // local storage of users on backend
    let users: any[] = JSON.parse(localStorage.getItem('users')) || [];

    return Observable.of(null).mergeMap (() => {

      if(request.url.endsWith('/api/devices.php')) {
        // return some devies
        let body = [
          {
            id: 1, project: 1,
            sn: 2011, production_date: "2017-05-12",
            hwVersion: "V1.4",
            fwVersion: "V1.3.1"
          },
          {
            id: 2, project: 1,
            sn: 2012, production_date: "2017-08-20",
            hwVersion: "V2.0",
            fwVersion: "V1.3.2"
          },
          {
            id: 3, project: 4,
            sn: 2012, production_date: "2017-08-20",
            hwVersion: "V2.0",
            fwVersion: "V1.3.2"
          },
          {
            id: 4, project: 4,
            sn: 2012, production_date: "2017-08-20",
            hwVersion: "V1.0",
            fwVersion: "V2.0"
          },
          {
            id: 5, project: 4,
            sn: 2012, production_date: "2017-08-20",
            hwVersion: "V1.0",
            fwVersion: "V2.0"
          }
        ];
        return Observable.of(new HttpResponse({status: 200, body: body}));
      }

      // pass request
      return next.handle(request);

    })
    // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
    .materialize()
    .delay(500)
    .dematerialize();

  }
}

export let fakeBackendProvider = {
  // use fake backend in place of Http service for backend-less development
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true
};
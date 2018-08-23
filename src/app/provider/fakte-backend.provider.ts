import { Injectable } from '@angular/core';
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
import { Device } from '../device';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    // local storage of users on backend
    let users: any[] = JSON.parse(localStorage.getItem('users')) || [];

    return of(null).pipe(
      mergeMap(() => {

        if (request.url.indexOf('/api/devices.php') != -1) {
          let lastIndex = request.url.indexOf('?project=');
          let body = [];
          if (lastIndex == -1) {
            console.log('fake: get all devices');
            body = devices;
          } else {
            let projectIndex = +request.url.substr(lastIndex + 9);
            console.log(`fake: get devices for project ${projectIndex}`);
            if (projectIndex == NaN) {
              return throwError('given project is no index number');
            }
            body = devices.filter(d => d.project == projectIndex);
          }

          return of(new HttpResponse({ status: 200, body: body }));
        }

        if (request.url.indexOf('/api/deviceEntries.php') != -1) {
          let lastIndex = request.url.indexOf('?device=');
          if (lastIndex == -1) {
            return throwError('no device index given');
          }

          let deviceIndex = +request.url.substr(lastIndex + 8);
          if (deviceIndex == NaN) {
            return throwError('given device is no index number');
          }

          console.log(`Requesting device index ${deviceIndex}`);

          // return some devies
          let body = entries.filter(d => d.device == deviceIndex);
          return of(new HttpResponse({ status: 200, body: body }));
        }

        if (request.url.endsWith('/api/projects.php')) {
          let body = projects;
          console.log("fake: project list");
          return of(new HttpResponse({ status: 200, body: body }));
        }

        if (request.url.indexOf('/api/addDevice.php') != -1) {
          console.log(request.url);
          const key = '?projectId=';
          let lastIndex = request.url.indexOf(key);
          if (lastIndex == -1) {
            return throwError('no project index given');
          }

          let projectIndex = +request.url.substr(lastIndex + key.length);
          if (projectIndex == NaN) {
            return throwError('given project is no index number');
          }

          console.log(`Request new device for project index ${projectIndex}`);

          // check if project exists
          let project = projects.find(p => p.id == projectIndex);
          if (project == null) {
            return throwError(`there is no project with id ${projectIndex}`);
          }

          project.lastDeviceSn++;
          let newdevice = new Device();
          newdevice.id = project.lastDeviceSn;
          newdevice.sn = project.lastDeviceSn;
          newdevice.projectId = projectIndex;
          newdevice.production_date = new Date();
          return of(new HttpResponse({ status: 200, body: newdevice }));
        }

        // pass request
        return next.handle(request);

      }),
      // call materialize and dematerialize to ensure delay even if an
      // error
      // is thrown
      // (https://github.com/Reactive-Extensions/RxJS/issues/648)
      materialize(), delay(500), dematerialize());
  }
}

export let fakeBackendProvider = {
  // use fake backend in place of Http service for backend-less development
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true
};


let entryTypes = ["HwVersion", "FwVersion", "Defect", "Shippment", "Remark"];

let entries = [
  { id: 11, device: 1, date: "2017-01-12", type: "HwVersion", data: "V1.4" },
  { id: 12, device: 1, date: "2017-01-23", type: "FwVersion", data: "V1.3.0" },
  { id: 13, device: 1, date: "2017-05-12", type: "Defect", data: "defect C1" },
  { id: 14, device: 1, date: "2017-06-12", type: "FwVersion", data: "V1.3.1" }, {
    id: 15,
    device: 1,
    date: "2017-07-12",
    type: "Defect",
    data: "connector broken"
  },
  { id: 16, device: 1, date: "2017-08-12", type: "FwVersion", data: "V1.3.2" },
  { id: 17, device: 1, date: "2017-08-12", type: "Shippment" },
  { id: 18, device: 1, date: "2018-05-12", type: "Shippment" },
  { id: 19, device: 1, date: "2017-05-12", type: "Remark", data: "Reserve" },
  { id: 20, device: 1, date: "2017-05-12", type: "FwVersion", data: "V1.3.4" },
  { id: 21, device: 2, date: "2017-05-12", type: "HwVersion", data: "V1.4.1" }
];

let devices = [
  {
    id: 1,
    project: 1,
    sn: 2011,
    production_date: "2017-05-12",
    hwVersion: "V1.4",
    fwVersion: "V1.3.1"
  },
  {
    id: 2,
    project: 1,
    sn: 2012,
    production_date: "2017-08-20",
    hwVersion: "V2.0",
    fwVersion: "V1.3.2"
  },
  {
    id: 3,
    project: 4,
    sn: 2013,
    production_date: "2017-08-20",
    hwVersion: "V2.0",
    fwVersion: "V1.3.2"
  },
  {
    id: 4,
    project: 4,
    sn: 2014,
    production_date: "2017-08-20",
    hwVersion: "V1.0",
    fwVersion: "V2.0"
  },
  {
    id: 5,
    project: 4,
    sn: 2015,
    production_date: "2017-08-20",
    hwVersion: "V1.0",
    fwVersion: "V2.0"
  }
];

let projects =
  [
    { id: 1, name: "Project A", description: "A demo project without a sense", lastDeviceSn: 3000 },
    { id: 2, name: "Project  B", description: "Chaning the world with this!", lastDeviceSn: 3000 },
    { id: 3, name: "Project Renasus", description: "Just a fake", lastDeviceSn: 3000 },
    { id: 4, name: "Eminet", description: "Home Automation", lastDeviceSn: 3000 }
  ]

let entryDataTags = [
  { type: "HwVersion", data: "V1.4" }, { type: "FwVersion", data: "V1.3.0" },
  { type: "Defect", data: "defect C1" }, { type: "FwVersion", data: "V1.3.1" },
  { type: "Defect", data: "connector broken" },
  { type: "FwVersion", data: "V1.3.2" }, { type: "Remark", data: "Reserve" },
  { type: "FwVersion", data: "V1.3.4" }, { type: "HwVersion", data: "V1.4.1" }
];

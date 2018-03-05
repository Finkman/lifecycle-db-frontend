import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { Device, DeviceEntry, DeviceSummary } from './device';

@Injectable()
export class DeviceService {

  private entriesUrl = 'api/entries';
  private devicesUrl = 'api/devices';

  constructor(private http: HttpClient) { }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      //this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string) {
    //this.logService.log(new LogMessage('DeviceService', message));
  }

  public getDeviceEntries(id: number): Observable<DeviceEntry[]> {
    const url = `${this.entriesUrl}/?deviceId=${id}`;
    return this.http.get<DeviceEntry[]>(url).pipe(
      tap(heroes => this.log(`fetched device entrires`)),
      catchError(this.handleError('getDeviceEntries', []))
    );
  }

  public getDeviceList(): Observable<DeviceSummary[]> {
    const url = `${this.devicesUrl}`;
    return this.http.get<DeviceSummary[]>(url).pipe(
      tap(devices => this.log(`fetched devices`)),
      catchError(this.handleError('getDeviceList', []))
    );

  }

}

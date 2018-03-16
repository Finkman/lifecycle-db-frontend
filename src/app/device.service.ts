import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { Device, DeviceEntry, Project } from './device';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class DeviceService {

  private entriesUrl = 'api/entries';
  private devicesUrl = 'api/devices';
  private entryTypesUrl = 'api/entryTypes';
  private entryDataTagsUrl = 'api/entryDataTags';
  private entryProjectsUrl = 'api/projects';

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
    console.log(message);
    //this.logService.log(new LogMessage('DeviceService', message));
  }

  getDeviceEntries(id: number): Observable<DeviceEntry[]> {
    const url = `${this.entriesUrl}/?device=${id}`;
    return this.http.get<DeviceEntry[]>(url).pipe(
      tap(heroes => this.log(`fetched device entrires`)),
      catchError(this.handleError('getDeviceEntries', []))
    );
  }

  getDevice(id: number): Observable<Device> {
    let url = `${this.devicesUrl}/${id}`;
    return this.http.get<Device>(url).pipe() /*
      tap(d => this.log(`fetched device`)),
      catchError(this.handleError('getDevice @id: ${id}', []))
    );*/
  }

  getDeviceList(project?: number): Observable<Device[]> {
    let url = this.devicesUrl;
    if(project){
      url = url.concat(`/${project}`);
    }

    return this.http.get<Device[]>(url).pipe(
      tap(devices => this.log(`fetched devices`)),
      catchError(this.handleError('getDeviceList', []))
    );

  }

  getEntryTypes(): Observable<string[]> {
    const url = this.entryTypesUrl;
    return this.http.get<string[]>(url).pipe(
      tap(list => this.log('fetch entryTypes')),
      catchError(this.handleError('getEntryTypes', []))
    );
  }

  getDataTags(dataType: string): Observable<any[]> {
    const url = `${this.entryDataTagsUrl}/?type=${dataType}`;
    return this.http.get<any[]>(url).pipe(
      tap(list => this.log('fetch DataTags')),
      catchError(this.handleError('getEntryTypes', []))
    );
  }

  addDeviceEntry(entry: DeviceEntry): Observable<DeviceEntry> {
    return this.http.post<DeviceEntry>(this.entriesUrl, entry, httpOptions)
      .pipe(
        tap(entry => this.log(`added entry w/ id=${entry.id}`)),
        catchError(this.handleError<DeviceEntry>('addDeviceEntry'))
      );
  }

  getProjects(): Observable<Project[]>{
    return this.http.get<Project[]>(this.entryProjectsUrl).pipe(
      tap(entry => this.log('get projects')),
      catchError(this.handleError<Project[]>('getProjects'))
    )
  }
}

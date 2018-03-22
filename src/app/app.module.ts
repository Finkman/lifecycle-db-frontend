import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { DeviceEntriesComponent } from './device-entries/device-entries.component';
import { AppRoutingModule } from './app-routing.module';

import { AuthGuard } from './guard/auth.guard';

import { DeviceService } from './device.service';
import { AuthenticationService } from './authentication.service';
import { DeviceListComponent } from './device-list/device-list.component';
import { AddDeviceEntryComponent } from './add-device-entry/add-device-entry.component';
import { LoginComponent } from './login/login.component';

import { DatePipe } from '@angular/common';
import { OrderModule } from 'ngx-order-pipe'; // <- import OrderModule

import {
  MatInputModule, MatAutocompleteModule,
  MatSelectModule, MatDatepickerModule,
  MatNativeDateModule, MatTableModule,
  MatSortModule, MatProgressSpinnerModule,
  MatCardModule, MatExpansionModule,
  MatButtonModule, MatIcon, MatToolbar,
  MatSidenav, MatSidenavContainer, MatToolbarModule, MatSidenavModule, MatIconModule
} from '@angular/material';

import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { ProjectListComponent } from './project-list/project-list.component';

import { jwtInterceptorProvider } from './provider/JwtInterceptor';

import { fakeBackendProvider } from './provider/fakte-backend.provider';
import { fakeLoginProvider } from './provider/fake-login.provider';
import { UserListComponent } from './user-list/user-list.component';

import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef} from '@angular/core';

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export const MY_FORMATS = {
  parse: {
    dateInput: 'DD-MM-YYYY',
  },
  display: {
    dateInput: 'DD-MM-YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'DD-MM-YYYY',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@NgModule({
  declarations: [
    AppComponent,
    DeviceEntriesComponent,
    DeviceListComponent,
    AddDeviceEntryComponent,
    ProjectListComponent,
    LoginComponent,
    UserListComponent
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule, FormsModule, ReactiveFormsModule, HttpClientModule, AppRoutingModule, OrderModule, MatInputModule, MatAutocompleteModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule, MatTableModule,
    MatSortModule, MatProgressSpinnerModule, MatCardModule, MatExpansionModule, MatButtonModule, MatToolbarModule,
    MatSidenavModule, MatIconModule
  ],
  providers: [
    AuthGuard,
    DeviceService,
    AuthenticationService,
    FormsModule,
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  
    // to provide auth-token
    jwtInterceptorProvider,

    // hook-in fake backend
    fakeBackendProvider,

    // hook-in fake login provider
    fakeLoginProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));
}


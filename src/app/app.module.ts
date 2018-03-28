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

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { LayoutModule, MediaMatcher } from '@angular/cdk/layout';

import {
  MatInputModule,
  MatAutocompleteModule,
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatTableModule,
  MatSortModule,
  MatListModule,
  MatProgressSpinnerModule,
  MatCardModule,
  MatExpansionModule,
  MatButtonModule,
  MatMenuModule,
  MatIcon,
  MatToolbar,
  MatSidenav,
  MatSidenavContainer,
  MatToolbarModule,
  MatSidenavModule,
  MatIconModule
} from '@angular/material';

import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { ProjectListComponent } from './project-list/project-list.component';

import { jwtInterceptorProvider } from './provider/JwtInterceptor';

import { fakeBackendProvider } from './provider/fakte-backend.provider';
import { fakeLoginProvider } from './provider/fake-login.provider';
import { UserListComponent } from './user-list/user-list.component';

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export const MY_FORMATS = {
  parse:
    {
      dateInput: 'DD-MM-YYYY'
    },
  display:
    {
      dateInput: 'DD-MM-YYYY',
      monthYearLabel: 'MMM YYYY',
      dateA11yLabel: 'DD-MM-YYYY',
      monthYearA11yLabel: 'MMMM YYYY'
    }
};

@NgModule({
  declarations:
    [
      AppComponent,
      DeviceEntriesComponent,
      DeviceListComponent,
      AddDeviceEntryComponent,
      ProjectListComponent,
      LoginComponent,
      UserListComponent
    ],
  imports:
    [
      BrowserModule,
      BrowserAnimationsModule,
      FormsModule,
      ReactiveFormsModule,
      HttpClientModule,
      AppRoutingModule,
      OrderModule,
      MatInputModule,
      MatAutocompleteModule,
      MatSelectModule,
      MatDatepickerModule,
      MatNativeDateModule,
      MatTableModule,
      MatMenuModule,
      MatSortModule,
      MatListModule,
      MatProgressSpinnerModule,
      MatCardModule,
      MatExpansionModule,
      MatButtonModule,
      MatToolbarModule,
      MatSidenavModule,
      MatIconModule
    ],
  providers:
    [
      AuthGuard,
      DeviceService,
      AuthenticationService,
      FormsModule,
      MediaMatcher,
      { provide: DateAdapter, useClass: MomentDateAdapter, deps: [ MAT_DATE_LOCALE ] },
      { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },

      // to provide auth-token
      jwtInterceptorProvider,

      // hook-in fake backend
      fakeBackendProvider,

      // hook-in fake login provider
      fakeLoginProvider
    ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);

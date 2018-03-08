import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';
import { DeviceEntriesComponent } from './device-entries/device-entries.component';
import { AppRoutingModule } from './app-routing.module';

import { DeviceService } from './device.service';
import { DeviceListComponent } from './device-list/device-list.component';
import { AddDeviceEntryComponent } from './add-device-entry/add-device-entry.component';

import { DatePipe } from '@angular/common';
import { OrderModule } from 'ngx-order-pipe'; // <- import OrderModule

import { MatInputModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    DeviceEntriesComponent,
    DeviceListComponent,
    AddDeviceEntryComponent
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule, FormsModule, HttpClientModule, HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    ), AppRoutingModule, OrderModule, MatInputModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule
  ],
  providers: [DeviceService, FormsModule],
  bootstrap: [AppComponent]
})
export class AppModule { }

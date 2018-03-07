import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';
import { DeviceEntriesComponent } from './device-entries/device-entries.component';
import { AppRoutingModule } from './/app-routing.module';

import { DeviceService } from './device.service';
import { DeviceListComponent } from './device-list/device-list.component';
import { AddDeviceEntryComponent } from './add-device-entry/add-device-entry.component';
import { EntryTypePipe } from './entry-type.pipe';
import { DatePipe } from '@angular/common';


@NgModule({
  declarations: [
    AppComponent,
    DeviceEntriesComponent,
    DeviceListComponent,
    AddDeviceEntryComponent,
    EntryTypePipe
  ],
  imports: [
    BrowserModule, FormsModule, HttpClientModule, HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    ), AppRoutingModule
  ],
  providers: [DeviceService],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';
import { DeviceEntriesComponent } from './device-entries/device-entries.component';
import { AppRoutingModule } from './/app-routing.module';

import { DeviceService } from './device.service';


@NgModule({
  declarations: [
    AppComponent,
    DeviceEntriesComponent
  ],
  imports: [
    BrowserModule, HttpClientModule, HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    ), AppRoutingModule
  ],
  providers: [DeviceService],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import { DeviceEntriesComponent } from './device-entries/device-entries.component';
import {DeviceListComponent} from './device-list/device-list.component';
import { ProjectListComponent } from './project-list/project-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/projectlist', pathMatch: 'full' },
  { path: 'devicelist', component: DeviceListComponent },
  { path: 'projectlist', component: ProjectListComponent },
  { path: 'entries/:deviceId', component: DeviceEntriesComponent }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)]
})
export class AppRoutingModule { }

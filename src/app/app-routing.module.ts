import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AuthGuard } from './guard/auth.guard';

import { DeviceEntriesComponent } from './device-entries/device-entries.component';
import { DeviceListComponent} from './device-list/device-list.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', component: ProjectListComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'devicelist', component: DeviceListComponent },
  { path: 'projectlist', component: ProjectListComponent },
  { path: 'entries/:deviceId', component: DeviceEntriesComponent },

  { path: '**', redirectTo: ''}
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)]
})
export class AppRoutingModule { }

import { Component, OnInit, ViewChild } from '@angular/core';

import { MatTableDataSource, MatSort } from '@angular/material';

import { DeviceEntry, Device } from '../device';
import { DeviceService } from '../device.service';
import { AuthenticationService } from '../authentication.service';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { OrderPipe } from 'ngx-order-pipe';
import { AccessLevel } from '../models/user';

@Component({
  selector: 'app-device-entries',
  templateUrl: './device-entries.component.html',
  styleUrls: ['./device-entries.component.scss']
})
export class DeviceEntriesComponent implements OnInit {
  displayedColumns = ['date', 'type', 'data'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatSort) sort: MatSort;

  isLoading: boolean = false;
  canAddEntries: boolean = false;
  deviceId: number;
  parentDevice: Device = new Device();

  addEntryVisible: boolean;

  constructor(private orderPipe: OrderPipe, private deviceService: DeviceService,
    private authenticationService: AuthenticationService, private location: Location, private route: ActivatedRoute, ) { }

  ngOnInit() {
    const userLevel = this.authenticationService.getCurrentUser().level;
    this.canAddEntries = userLevel == AccessLevel.Creator;
    this.addEntryVisible = false;
    this.dataSource.sort = this.sort;
    this.deviceId = +this.route.snapshot.paramMap.get('deviceId');
    this.getDevice();
    this.getDeviceEntries();
  }

  getDeviceEntries(): void {
    this.isLoading = true;
    this.deviceService.getDeviceEntries(this.deviceId).
      subscribe((list) => {
        this.isLoading = false;
        this.dataSource.data = list;
      });
  }

  getDevice(): void {
    console.log(this.deviceId);
    this.deviceService.getDevice(this.deviceId)
      .subscribe(d => this.parentDevice = d);
  }

  goBack(): void {
    this.location.back();
  }

  newEntry(): void {
    this.addEntryVisible = true;
  }

  onAdded(success: boolean) {
    if (success) {
      this.getDeviceEntries();
    }

    this.addEntryVisible = false;
  }


}

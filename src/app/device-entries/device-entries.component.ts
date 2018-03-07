import { Component, OnInit } from '@angular/core';

import { DeviceEntry, Device } from '../device';
import { DeviceService } from '../device.service';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { OrderPipe } from 'ngx-order-pipe';

@Component({
  selector: 'app-device-entries',
  templateUrl: './device-entries.component.html',
  styleUrls: ['./device-entries.component.scss']
})
export class DeviceEntriesComponent implements OnInit {
  deviceEntries: DeviceEntry[];
  order: string = 'date';
  reverse: boolean = false;
  deviceId: number;
  parentDevice: Device;

  addEntryVisible: boolean;

  constructor(private orderPipe: OrderPipe, private deviceService: DeviceService, private location: Location, private route: ActivatedRoute, ) { }

  ngOnInit() {
    this.addEntryVisible = false;
    this.deviceId = +this.route.snapshot.paramMap.get('deviceId');
    this.getDevice();
    this.getDeviceEntries();
  }

  getDeviceEntries(): void {
    this.deviceService.getDeviceEntries(this.deviceId).
      subscribe(entries => this.deviceEntries = entries);
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

  setOrder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }

    this.order = value;
  }

}

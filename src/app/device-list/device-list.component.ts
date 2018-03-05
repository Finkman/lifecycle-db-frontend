import { Component, OnInit } from '@angular/core';

import { DeviceService } from '../device.service';
import { DeviceSummary, Device } from '../device';

@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.css']
})
export class DeviceListComponent implements OnInit {
  deviceList: DeviceSummary[];

  constructor(private deviceService: DeviceService) { }

  ngOnInit() {
    this.getDeviceList();
  }

  getDeviceList(): void {
    this.deviceService.getDeviceList().
      subscribe(list => this.deviceList = list);
  }
}

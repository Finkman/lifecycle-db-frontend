import { Component, OnInit } from '@angular/core';

import { DeviceService } from '../device.service';
import { DeviceSummary, Device } from '../device';
import { OrderPipe } from 'ngx-order-pipe';

@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.scss']
})
export class DeviceListComponent implements OnInit {
  deviceList: DeviceSummary[];
  order: string = 'id';
  reverse: boolean = true;

  constructor(private orderPipe: OrderPipe, private deviceService: DeviceService) { }

  ngOnInit() {
    this.getDeviceList();
  }

  getDeviceList(): void {
    this.deviceService.getDeviceList().
      subscribe(list => this.deviceList = list);
  }

  setOrder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }

    this.order = value;
  }
}

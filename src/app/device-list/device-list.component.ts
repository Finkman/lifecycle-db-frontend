import { Component, OnInit, ViewChild } from '@angular/core';

import { MatTableDataSource, MatSort } from '@angular/material';

import { DeviceService } from '../device.service';
import { Device } from '../device';
import { OrderPipe } from 'ngx-order-pipe';

@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.scss']
})
export class DeviceListComponent implements OnInit {
  isLoading: boolean = false;
  displayedColumns = ['sn', 'production_date', 'hwVersion', 'fwVersion'];
  dataSource = new MatTableDataSource([]);
  @ViewChild(MatSort) sort: MatSort;

  constructor(private orderPipe: OrderPipe, private deviceService: DeviceService) { }

  ngOnInit() {
    this.getDeviceList();
  }

  getDeviceList(): void {
    this.isLoading = true;
    this.deviceService.getDeviceList().
      subscribe((list) => {
        this.dataSource = new MatTableDataSource(list);
        this.dataSource.sort = this.sort;
        this.isLoading = false;
      });
  }

}

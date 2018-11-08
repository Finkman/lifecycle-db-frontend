import {Component, OnInit, ViewChild} from '@angular/core';

import {MatTableDataSource, MatSort} from '@angular/material';

import {DeviceService} from '../device.service';
import {Device} from '../device';
import {OrderPipe} from 'ngx-order-pipe';
import {ActivatedRoute} from '@angular/router';

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

  projectId: number = null;

  constructor(
      private orderPipe: OrderPipe, private deviceService: DeviceService,
      private route: ActivatedRoute) {}

  ngOnInit() {
    let projectParam = this.route.snapshot.paramMap.get('projectId');
    if (projectParam != null) {
      this.projectId = +projectParam;
    }
    this.getDeviceList();
  }

  getDeviceList(): void {
    this.isLoading = true;
    this.deviceService.getDeviceList(this.projectId).subscribe((list) => {
      this.dataSource = new MatTableDataSource(list);
      this.dataSource.sort = this.sort;
      this.isLoading = false;
    });
  }
}

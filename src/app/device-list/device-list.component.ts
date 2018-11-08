import {Component, OnInit, ViewChild} from '@angular/core';

import {MatTableDataSource, MatSort} from '@angular/material';

import {DeviceService} from '../device.service';
import {Device, Project} from '../device';
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

  private _parentProject: Project = null;
  parentProjectAvailable: boolean;

  constructor(
      private orderPipe: OrderPipe, private deviceService: DeviceService,
      private route: ActivatedRoute) {}

  ngOnInit() {
    let projectParam = this.route.snapshot.paramMap.get('projectId');
    if (projectParam != null) {
      this.getProjectInfo(+projectParam);
    } else {
      this.getDeviceList();
    }
  }

  get parentProject(): Project { return this._parentProject; }

  set parentProject(p: Project) {
    this._parentProject = p;
    this.parentProjectAvailable = p != null;
  }

  getProjectInfo(projectId: number): void {
    this.deviceService.getProject(projectId).subscribe(p => {
      this.parentProject = p;
      this.getDeviceList();
    });
  }

  getDeviceList(): void {
    this.isLoading = true;
    this.deviceService
        .getDeviceList(this.parentProject ? this.parentProject.id : null)
        .subscribe((list) => {
          this.dataSource = new MatTableDataSource(list);
          this.dataSource.sort = this.sort;
          this.isLoading = false;
        });
  }
}

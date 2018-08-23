import { Component, OnInit } from '@angular/core';
import { DeviceService } from '../device.service';
import { Device, Project } from '../device';
import { map } from 'rxjs/operators/map';
import { AuthenticationService } from '../authentication.service';
import { AccessLevel } from '../models/user';

export class ProjectModel {
  project: Project;
  devices: Device[];
  initialLoaded: boolean = false;
  loading: boolean = false;
}

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {
  isLoading: boolean = false;
  canAddDevice: boolean = false;
  displayedColumns = ['sn', 'production_date', 'hwVersion', 'fwVersion'];
  projects: ProjectModel[] = [];

  constructor(private deviceService: DeviceService, private authService: AuthenticationService) { }

  ngOnInit() {
    const userLevel = this.authService.getCurrentUser().level;
    this.canAddDevice = userLevel == AccessLevel.Creator
    this.getProjectList();
  }

  getProjectList(): void {
    this.isLoading = true;
    this.deviceService.getProjects().pipe(
      map(ps => {
        let models: ProjectModel[] = [];
        for (var i = 0; i < ps.length; i++) {
          let m = new ProjectModel();
          m.project = ps[i];
          models.push(m);
        }

        return models;
      })
    ).subscribe(
      (list) => {
        this.projects = list;
        this.isLoading = false;
      }
    );
  }

  updateDeviceList(model: ProjectModel) {
    model.loading = true;
    this.deviceService.getDeviceList(model.project.id)
      .subscribe(
        deviceList => {
          model.devices = deviceList;
          model.loading = false;
          model.initialLoaded = true;
        }
      );
  }

  onAddDevice(projectModel: ProjectModel) {
    this.deviceService.addDevice(projectModel.project).subscribe(any =>
      this.updateDeviceList(projectModel)
    );
  }

}

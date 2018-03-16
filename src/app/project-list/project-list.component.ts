import { Component, OnInit } from '@angular/core';
import { DeviceService } from '../device.service';
import { Device, Project } from '../device';


@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {
  isLoading: boolean = false;
  projects : Project[] = [];

  constructor( private deviceService: DeviceService) { }

  ngOnInit() {
    this.getProjectList();
  }

  getProjectList(): void{
    this.isLoading = true;
    this.deviceService.getProjects().subscribe(
      (list) => {
        this.projects = list;
        this.isLoading = false;
      }
    );
  }

}

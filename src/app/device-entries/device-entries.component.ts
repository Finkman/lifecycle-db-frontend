import { Component, OnInit } from '@angular/core';

import { DeviceEntry, EntryType } from '../device';
import { DeviceService } from '../device.service';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-device-entries',
  templateUrl: './device-entries.component.html',
  styleUrls: ['./device-entries.component.css']
})
export class DeviceEntriesComponent implements OnInit {
  deviceEntries: DeviceEntry[];
  deviceId: number;

  constructor(private deviceService: DeviceService, private location: Location, private route: ActivatedRoute, ) { }

  ngOnInit() {
    this.getDeviceEntries();
  }

  public getDeviceEntries(): void {
    this.deviceId = +this.route.snapshot.paramMap.get('deviceId');
    console.log(this.deviceId);
    this.deviceService.getDeviceEntries(this.deviceId).
      subscribe(entries => this.deviceEntries = entries);
  }

  getType(typeId: number): any {
    return EntryType[typeId];
  }

  goBack(): void {
    this.location.back();
  }

}

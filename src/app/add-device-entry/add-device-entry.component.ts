import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

import { DeviceEntry, EntryType } from '../device';
import { DeviceService } from '../device.service';



@Component({
  selector: 'app-add-device-entry',
  templateUrl: './add-device-entry.component.html',
  styleUrls: ['./add-device-entry.component.css']
})

export class AddDeviceEntryComponent implements OnInit {

  @Input() deviceId: number;
  @Output() onAdded = new EventEmitter<boolean>();

  typeNames: string[] = [];
  model: DeviceEntry;
  isLocked: boolean = false;
  tagsLoaded: boolean = false;


  constructor(private deviceService: DeviceService, ) { }

  ngOnInit() {
    this.getEntryTypes();
    this.model = new DeviceEntry();
    this.model.date = new Date(Date.now());
    this.model.deviceId = this.deviceId;
    this.model.type = this.typeNames[0];
  }

  getEntryTypes() {
    this.deviceService.getEntryTypes().subscribe(
      (list) => {
        this.typeNames = list;
        this.tagsLoaded = true;
      }
    );
  }

  onSubmit() {
    this.isLocked = true;
    this.deviceService.addDeviceEntry(this.model).subscribe(res => {
      this.onAdded.emit(true);
      this.isLocked = true;
    }
    );

  }

  cancel() {
    this.model = new DeviceEntry();
    this.onAdded.emit(false);
  }


}

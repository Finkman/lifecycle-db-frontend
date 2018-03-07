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

  model: DeviceEntry;


  constructor(private deviceService: DeviceService, ) { }

  ngOnInit() {
    this.model = new DeviceEntry();
    this.model.deviceId = this.deviceId;
  }

  onSubmit() {
    // do magic
    //this.onAdded.emit(true);
    this.model.date = new Date(Date.now());
    this.deviceService.addDeviceEntry(this.model).subscribe(res => {
      this.onAdded.emit(true);
    }
    );

  }

  cancel() {
    this.model = new DeviceEntry();
    this.onAdded.emit(false);
  }

  typeNames(): Array<[string, number]> {
    var names: [string, number][] = [];
    for (var n in EntryType) {
      if (typeof EntryType[n] === 'number') {
        names.push([n, +EntryType[n]]);
      }
    }
    return names;
  }



}

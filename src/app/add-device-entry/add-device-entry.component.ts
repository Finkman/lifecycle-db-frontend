import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import { DeviceEntry } from '../device';

@Component({
  selector: 'app-add-device-entry',
  templateUrl: './add-device-entry.component.html',
  styleUrls: ['./add-device-entry.component.css']
})

export class AddDeviceEntryComponent implements OnInit {

  @Output() onAdded = new EventEmitter<boolean>();

  typeNames = ["Test1", "Test2"];

  model: DeviceEntry;

  constructor() { }

  ngOnInit() {
    this.model = new DeviceEntry();
  }

  addEntry() {
    // do magic
    this.onAdded.emit(true);
  }

  cancel() {
    this.model = new DeviceEntry();
    this.onAdded.emit(false);
  }

}

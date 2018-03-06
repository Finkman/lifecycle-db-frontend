import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import { DeviceEntry, EntryType } from '../device';

@Component({
  selector: 'app-add-device-entry',
  templateUrl: './add-device-entry.component.html',
  styleUrls: ['./add-device-entry.component.css']
})

export class AddDeviceEntryComponent implements OnInit {

  @Output() onAdded = new EventEmitter<boolean>();

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

  typeNames(): Array<string> {
    var names: string[] = [];
    for (var n in EntryType) {
      if (typeof EntryType[n] === 'number') {
        names.push(n);
      }
    }
    return names;
  }

}

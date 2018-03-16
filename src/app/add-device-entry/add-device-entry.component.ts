import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

import { DeviceEntry, EntryType } from '../device';
import { DeviceService } from '../device.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';


import * as _moment from 'moment';
//import { default as _rollupMoment } from 'moment';
//const moment = _rollupMoment || _moment;
const moment = _moment;

import * as Moment from 'moment';

@Component({
  selector: 'app-add-device-entry',
  templateUrl: './add-device-entry.component.html',
  styleUrls: ['./add-device-entry.component.css']
})

export class AddDeviceEntryComponent implements OnInit {

  @Input() deviceId: number;
  @Output() onAdded = new EventEmitter<boolean>();

  typeNames: string[] = [];

  date: FormControl = new FormControl(moment);
  dataInputControl: FormControl = new FormControl();
  typeSelectControl: FormControl = new FormControl();

  dataOptions = [];

  filteredOptions: Observable<string[]>;

  model: DeviceEntry;
  isLocked: boolean = false;
  tagsLoaded: boolean = false;


  constructor(private deviceService: DeviceService, ) { }

  ngOnInit() {
    this.getEntryTypes();
    this.model = new DeviceEntry();
    this.model.date = new Date(Date.now());
    this.model.device = this.deviceId;
    this.model.type = this.typeNames[0];
    this.filteredOptions = this.dataInputControl.valueChanges
      .pipe(
        startWith(''),
        map(val => this.filter(val))
      );

    this.typeSelectControl.valueChanges.subscribe(
      val => {
        console.log(`Changed to ${val}`);
        this.getDataTypeTags();
      }
    );
  }

  getDataTypeTags() {
    console.log(`Get DataTags for ${this.model.type}`);
    this.deviceService.getDataTags(this.model.type).subscribe(
      (list) => {
        let newList: string[] = [];
        for (let tuple of list) {
          newList.push(tuple.data);
        }
        this.dataOptions = newList;
        // retrigger option load and clear field
        this.dataInputControl.setValue('');
      }
    );
  }


  filter(val: string): string[] {
    return this.dataOptions.filter(option =>
      option.toLowerCase().indexOf(val.toLowerCase()) === 0);
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

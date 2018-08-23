import {Component, OnInit, EventEmitter, Output} from '@angular/core';

import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  @Output() onAdded = new EventEmitter<boolean>();

  usernameControl: FormControl = new FormControl();
  emailControl: FormControl = new FormControl();
  isLocked: boolean = false;


  constructor() {}

  ngOnInit() {}

  onSubmit() {
    this.isLocked = true;
    // do stuff to create
    {
      this.onAdded.emit(true);
      this.isLocked = false;
    }
  }

  cancel() { this.onAdded.emit(false); }
}

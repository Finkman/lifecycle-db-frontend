import {Component, OnInit, EventEmitter, Output} from '@angular/core';

import {FormControl} from '@angular/forms';
import {User, AccessLevel} from '../models/user';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  @Output() onAdded = new EventEmitter<boolean>();

  usernameControl: FormControl = new FormControl();
  emailControl: FormControl = new FormControl();
  firstnameControl: FormControl = new FormControl();
  lastnameControl: FormControl = new FormControl();
  isLocked: boolean = false;

  model: User;

  constructor() {}

  ngOnInit() {
    this.isLocked = false;
    this.model = new User();
    this.model._id = "";
    this.model.level = AccessLevel.Visitor;
  }

  onSubmit() {
    this.isLocked = true;
    console.log(`Add user: ${this.model.username}`);
    {
      this.onAdded.emit(true);
      this.isLocked = false;
    }
  }

  cancel() { this.onAdded.emit(false); }
}

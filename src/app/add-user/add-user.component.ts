import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import { FormControl, Validators } from '@angular/forms';
import { User, AccessLevel } from '../models/user';
import { AuthenticationService } from '../authentication.service';

let usernameLength = { min: 4, max: 50 };

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  @Output() onAdded = new EventEmitter<boolean>();

  usernameControl: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(usernameLength.min),
    Validators.maxLength(usernameLength.max)
  ]);
  emailControl: FormControl = new FormControl('', [Validators.required, Validators.email]);
  firstnameControl: FormControl = new FormControl();
  lastnameControl: FormControl = new FormControl();
  isLocked: boolean = false;

  model: User;

  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
    this.isLocked = false;
    this.model = new User();
    this.model._id = "";
    this.model.level = AccessLevel.Visitor;
  }

  onSubmit() {
    this.isLocked = true;
    this.authService.addUser(this.model).subscribe(res => {
      this.onAdded.emit(true);
      this.isLocked = false;
    });
  }

  getUsernameError() {
    if (this.usernameControl.hasError('required')) {
      return 'You must enter a username';
    } else if (this.usernameControl.hasError('minlength') || this.usernameControl.hasError('minlength')) {
      return `Length must be in range of [${usernameLength.min}, ${usernameLength.max}]`;
    } else {
      return 'Unknown error!';
    }
  }

  getEmailError() {
    if (this.emailControl.hasError('required')) {
      return 'You must enter an email';
    } else if (this.emailControl.hasError('email')) {
      return 'Invalid email address';
    } else {
      return 'Unknown error';
    }
  }

  cancel() { this.onAdded.emit(false); }
}

import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import { FormControl, Validators, ValidatorFn, AbstractControl, AsyncValidator, ValidationErrors, AsyncValidatorFn } from '@angular/forms';
import { User, AccessLevel } from '../models/user';
import { AuthenticationService } from '../authentication.service';
import { Observable } from 'rxjs';

let usernameLength = { min: 4, max: 50 };


function emailExistsValidator(authService: AuthenticationService): AsyncValidatorFn {
  return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    return authService.isEmailRegistered(control.value).map(
      doesExist => doesExist ? { "emailExists": true } : null);
  };
}

function usernameExistsValidator(authService: AuthenticationService): AsyncValidatorFn {
  return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    return authService.isUsernameRegistered(control.value).map(
      doesExist => doesExist ? { "usernameExists": true } : null);
  };
}


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
  ], usernameExistsValidator(this.authService));
  emailControl: FormControl = new FormControl('', [
    Validators.required,
    Validators.email
  ], emailExistsValidator(this.authService));
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
    } else if (this.usernameControl.hasError('usernameExists')) {
      return 'This username is already registered';
    } else {
      return 'Unknown error!';
    }
  }

  getEmailError() {
    if (this.emailControl.hasError('required')) {
      return 'You must enter an email';
    } else if (this.emailControl.hasError('email')) {
      return 'Invalid email address';
    } else if (this.emailControl.hasError('emailExists')) {
      return 'This email is already registered';
    } else {
      return 'Unknown error';
    }
  }

  cancel() { this.onAdded.emit(false); }
}

import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import { FormControl, Validators, ValidatorFn, AbstractControl, AsyncValidator, ValidationErrors, AsyncValidatorFn, FormGroup } from '@angular/forms';
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

  addUserForm = new FormGroup({
    'username': new FormControl('', [
      Validators.required,
      Validators.minLength(usernameLength.min),
      Validators.maxLength(usernameLength.max),
    ], usernameExistsValidator(this.authService)),
    'email': new FormControl('', [
      Validators.required,
      Validators.email
    ], emailExistsValidator(this.authService)),
    'firstname': new FormControl(''),
    'lastname': new FormControl('')
  }, { updateOn: 'blur' });

  isLocked: boolean = false;

  constructor(private authService: AuthenticationService) { }

  get username() { return this.addUserForm.get('username'); }

  get email() { return this.addUserForm.get('email'); }

  get fristname() { return this.addUserForm.get('firstname'); }

  get lastname() { return this.addUserForm.get('lastname'); }


  ngOnInit() {
    this.isLocked = false;
  }



  onSubmit() {
    let model = new User();
    model._id = "";
    model.level = AccessLevel.Visitor;
    model.email = this.email.value;
    model.firstName = this.fristname.value;
    model.username = this.username.value;
    model.lastName = this.lastname.value;
    this.isLocked = true;
    this.authService.addUser(model).subscribe(res => {
      this.onAdded.emit(true);
      this.isLocked = false;
    });
  }

  getUsernameError() {
    if (this.username.hasError('required')) {
      return 'You must enter a username';
    } else if (this.username.hasError('minlength') || this.username.hasError('minlength')) {
      return `Length must be in range of [${usernameLength.min}, ${usernameLength.max}]`;
    } else if (this.username.hasError('usernameExists')) {
      return 'This username is already registered';
    } else {
      return 'Unknown error!';
    }
  }

  getEmailError() {
    if (this.email.hasError('required')) {
      return 'You must enter an email';
    } else if (this.email.hasError('email')) {
      return 'Invalid email address';
    } else if (this.email.hasError('emailExists')) {
      return 'This email is already registered';
    } else {
      return 'Unknown error';
    }
  }

  cancel() { this.onAdded.emit(false); }
}

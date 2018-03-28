import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../authentication.service';

import {User} from '../models/user';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  username:string;
  userList: User[] = [];

  constructor(private authService: AuthenticationService) {}

  ngOnInit() {
    this.username = this.authService.getCurrentUser().username;
    this.authService.getUserList().subscribe(
      list => this.userList = list
    );
  }
}

import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';

import { User, AccessLevel } from '../models/user';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  canAddEntries: boolean = false;
  addUserVisible: boolean;
  username: string;
  userList: User[] = [];

  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
    this.canAddEntries = this.authService.getCurrentUser().level == AccessLevel.Creator;
    this.addUserVisible = false;
    this.username = this.authService.getCurrentUser().username;
    this.getUserList();
  }

  getUserList() {
    this.authService.getUserList().subscribe(list => this.userList = list);
  }

  showNewUserForm(): void { this.addUserVisible = true; }

  onAdded(success: boolean) {
    if (success) {
      this.getUserList();
    }

    this.addUserVisible = false;
  }
}

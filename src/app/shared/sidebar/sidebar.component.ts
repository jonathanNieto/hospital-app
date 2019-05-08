import { Component, OnInit } from '@angular/core';
import { SidebarService, UserService } from '../../services/service.index';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  user: User;

  constructor(public sidebarService: SidebarService, public userService: UserService) { }

  ngOnInit() {
    this.user = this.userService.user;
    this.sidebarService.loadMenu();
  }

}

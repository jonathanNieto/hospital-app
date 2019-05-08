import { Injectable } from '@angular/core';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  /* menu: any[] = [
    {
      title: 'Principal',
      icon: 'mdi mdi-gauge',
      subMenu: [
        { title: 'Dashborad', url: '/dashboard' },
        { title: 'ProggresBar', url: '/progress' },
        { title: 'Graficas', url: '/graph1' },
        { title: 'Promesas', url: '/promises' },
        { title: 'Rxjs', url: '/rxjs' },
      ]
    },
    {
      title: 'Mantenimientos',
      icon: 'mdi mdi-folder-lock',
      subMenu: [
        { title: 'Usuarios', url: '/users' },
        { title: 'Hospitales', url: '/hospitals' },
        { title: 'Médicos', url: '/doctors' },
      ]
    }
  ]; */

  menu: any[] = [];

  constructor(public userService: UserService) { }
  
  loadMenu() {
    this.menu = this.userService.menu;
  }
}

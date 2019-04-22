import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any[] = [
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
  ];
  constructor() { }
}

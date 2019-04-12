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
        {
          title: 'Dashborad',
          url: '/dashboard'
        },
        {
          title: 'ProggresBar',
          url: '/progress'
        },
        {
          title: 'Graficas',
          url: '/graph1'
        },
      ]
    }
  ];
  constructor() { }
}
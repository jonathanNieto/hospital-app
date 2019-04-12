import { Component, OnInit, Inject, ElementRef } from '@angular/core';
import { SettingsService } from '../../services/service.index';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {

  constructor(private settingsService: SettingsService) { }

  ngOnInit() {
    this.placeWorkingClass();
  }

  changeColor(theme: string, link: any) {
    this.applyWorkingClass(link);
    this.settingsService.applyTheme(theme);
  }

  applyWorkingClass(link: any) {
    const links: any = document.getElementsByClassName('selector');
    for (const ref of links) {
      ref.classList.remove('working');
    }
    link.classList.add('working');
  }

  placeWorkingClass() {
    const links: any = document.getElementsByClassName('selector');
    const theme = this.settingsService.settings.theme;

    for (const ref of links) {
      if (ref.getAttribute('data-theme') === theme) {
        ref.classList.add('working');
        break;
      }
    }
  }

}

import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  settings: Settings = {
    urlTheme: './assets/css/colors/default.css',
    theme: 'default'
  }

  constructor(@Inject(DOCUMENT) private document) {
    this.loadSettings();
  }

  saveSettings() {
    localStorage.setItem('settings', JSON.stringify(this.settings))
  }

  loadSettings() {
    if (localStorage.getItem('settings')) {
      try {
        this.settings = JSON.parse(localStorage.getItem('settings'));
      } catch (error) {
        console.log({error});        
      }
      this.applyTheme(this.settings.theme);
    } else {
      this.applyTheme(this.settings.theme);
    }
  }

  applyTheme(theme: string) {
    const url = `./assets/css/colors/${theme}.css`;
    this.document.getElementById('theme').setAttribute('href', url);
    this.settings.theme = theme;
    this.settings.urlTheme = url;
    this.saveSettings();
  }
}

interface Settings {
  urlTheme: string;
  theme: string;
}
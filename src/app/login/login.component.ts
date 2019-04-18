import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UserService } from '../services/service.index';
import { User } from '../models/user.model';
import { element } from 'protractor';

declare function init_plugins();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  rememberme = false;
  email: string;

  auth2: any; // The Sign-In object.


  constructor(public router: Router, public userService: UserService) { }

  ngOnInit() {
    init_plugins();
    this.googleInit();
    this.email = localStorage.getItem('email') || '';
    if (this.email.length > 0) {
      this.rememberme = true;
    }
  }

  ingresar(formulario: NgForm) {
    if (formulario.invalid) {
      return;
    }
    const user = new User('', '', formulario.value.email, formulario.value.password);
    this.userService.login(user, formulario.value.rememberme)
      .subscribe((response) => {
        this.router.navigate(['/dashboard']);
      });
  }

  googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '51534013345-ufh7oqg475slp3bq90rni4beqg9af1rn.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });
      this.attachSignin(document.getElementById('btnGoogle'));
    });
  }

  // tslint:disable-next-line: no-shadowed-variable
  attachSignin(element: any) {
    this.auth2.attachClickHandler(element, {}, (googleUser) => {
      /* let profile = googleUser.getBasicProfile(); */
      const token = googleUser.getAuthResponse().id_token;
      this.userService.loginGoogle(token)
        .subscribe((response) => window.location.href = '#/dashboard');
    })
  }
}

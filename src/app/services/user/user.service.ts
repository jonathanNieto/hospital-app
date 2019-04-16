import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: User;
  token: string;

  constructor(public http: HttpClient, public router: Router) {
    this.loadStorage();
  }

  loginGoogle(token: string) {
    const url = `${environment.url}/login/google`;
    return this.http.post(url, { token }).pipe(
      map((response: any) => {
        this.saveStorage(response.id, response.token, response.user);
        this.loadStorage();
        return true;
      })
    );
  }

  login(user: User, rememberme: boolean) {
    if (rememberme) {
      localStorage.setItem('email', user.getEmail());
    } else {
      localStorage.removeItem('email');
    }
    const url = `${environment.url}/login`;
    return this.http.post(url, user).pipe(
      map((response: any) => {
        this.saveStorage(response.id, response.token, response.user);
        this.loadStorage();
        return true;
      }));
  }

  createUser(user: User) {
    const url = `${environment.url}/user`;
    return this.http.post(url, user).pipe(
      map((response: { user: any; }) => {
        Swal.fire({
          title: 'Usuario creado!',
          text: user.getEmail(),
          type: 'success',
          confirmButtonText: 'OK'
        });
        return response.user;
      }));
  }

  saveStorage(id: string, token: string, user: any) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  }

  isUserLogged() {
    return (this.token.length > 0) ? true : false;
  }

  loadStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.user = JSON.parse(localStorage.getItem('user'))
    } else {
      this.token = '';
      this.user = null;
    }
  }

  logout() {
    this.token = '';
    this.user = null;
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

}

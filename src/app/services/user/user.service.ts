import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { UploadFileService } from '../upload-file/upload-file.service';



@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: User = new User('', '', '', '');
  token: string;

  constructor(public http: HttpClient, public router: Router, public uploadFileService: UploadFileService) {
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
      map((response: any) => {
        console.log({ response });
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
      /* this.user = JSON.parse(localStorage.getItem('user')); */
      /* IMPORTANT this.user has to be an object of type User NOT a single object */
      if (this.user === null) {
        this.user = new User('', '', '', '');
      }
      if (localStorage.getItem('user')) {
        const userlocal = JSON.parse(localStorage.getItem('user'));
        this.user.setName(userlocal.name);
        this.user.setLastname(userlocal.lastname);
        this.user.setEmail(userlocal.email);
        this.user.setId(userlocal._id);
        this.user.setGoogle(userlocal.google);
        this.user.setImg(userlocal.img);
      }
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

  updateUser(user: User | any) {
    console.log(typeof user);
    console.log({ user });
    const id = (user instanceof User) ? user.getId() : user._id;
    const name = (user instanceof User) ? user.getName() : user.name;
    const lastname = (user instanceof User) ? user.getLastname() : user.lastname;
    const email = (user instanceof User) ? user.getEmail() : user.email;
    const url = `${environment.url}/user/${id}?token=${this.token}`;
    return this.http.put(url, user).pipe(
      map((response: any) => {
        console.log({ id });
        console.log(this.user.getId());
        console.log({ response });
        if (id === this.user.getId()) {
          console.log('son iguales');
          this.saveStorage(id, this.token, response.user);
        }
        this.loadStorage();
        Swal.fire({
          title: 'Usuario actualizado!',
          text: `${name} ${lastname}, ${email}`,
          type: 'success',
          confirmButtonText: 'OK'
        });
        return true;
      })
    );
  }

  changeImage(file: File, id: string) {
    this.uploadFileService.uploadFile(file, 'users', id)
      .then((response: any) => {
        if (this.user === null) {
          console.log('user was null');
          this.user = new User('', '', '', '');
        }
        this.user.setImg(response.user.img);
        Swal.fire({
          title: 'Imagen actualizada!',
          text: `${this.user.getName()} ${this.user.getLastname()}, ${this.user.getEmail()}`,
          type: 'success',
          confirmButtonText: 'OK'
        });
        this.saveStorage(id, this.token, this.user);
      })
      .catch((response) => {
        console.log({ response });
      });
  }

  loadUsers(offset: number = 0) {
    const url = `${environment.url}/user?offset=${offset}`;
    return this.http.get(url);
  }

  searchUsers(term: string) {
    const url = `${environment.url}/search/user/${term}`;
    return this.http.get(url).pipe(
      map((response: any) => response.users)
    );
  }

  deleteUser(id: string) {
    const url = `${environment.url}/user/${id}?token=${this.token}`;
    return this.http.delete(url);
  }

}

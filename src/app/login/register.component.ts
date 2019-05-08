import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../services/service.index';
import { User } from '../models/user.model';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

declare function init_plugins();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;

  constructor(private userService: UserService, private router: Router) { }

  areEqual(str1: string, str2: string) {
    return (group: FormGroup) => {
      const pass1 = group.controls[str1].value;
      const pass2 = group.controls[str2].value;
      // tslint:disable-next-line: curly
      if (pass1 === pass2) return null;
      return { areEqual: true };
    };
  }
  ngOnInit() {
    init_plugins();

    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      lastname: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password1: new FormControl(null, Validators.required),
      password2: new FormControl(null, Validators.required),
      terms: new FormControl(false),
    }, { validators: this.areEqual('password1', 'password2') });
    this.form.setValue({
      name: 'John',
      lastname: 'Doe',
      email: `correo@correo.com`,
      password1: '123456',
      password2: '123456',
      terms: true
    });
  }

  saveUser() {
    if (this.form.invalid) {
      return;
    }
    if (!this.form.value.terms) {
      Swal.fire({
        title: 'Importante!',
        text: 'Debe aceptar las condiciones',
        type: 'warning',
        confirmButtonText: 'OK'
      });

      return;
    }
    const user = new User(
      this.form.value.name,
      this.form.value.lastname,
      this.form.value.email,
      this.form.value.password1
    );
    this.userService.createUser(user)
      .subscribe(
        (response) => this.router.navigate(['/login']),
        (error) => {
          const errorMessage = error.error.errors.errors.email.message;
          Swal.fire({
            title: 'Oops ... :(!',
            text: `${errorMessage}, por favor escriba otro!`,
            type: 'success',
            confirmButtonText: 'OK'
          });
        }
      );
  }

}

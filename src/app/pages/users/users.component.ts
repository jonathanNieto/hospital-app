import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from '../../services/service.index';
import Swal from 'sweetalert2'
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: []
})
export class UsersComponent implements OnInit {

  users: User[] = [];
  offset = 0;
  countUsers = 0;
  loading = true;

  constructor(public userService: UserService, public modalUploadService: ModalUploadService) { }

  ngOnInit() {
    this.loadUsers();
    this.modalUploadService.notification
      .subscribe((response) => {
        this.loadUsers();
      });
  }

  loadUsers() {
    this.loading = true;
    this.userService.loadUsers(this.offset)
      .subscribe((response: any) => {
        this.countUsers = response.length;
        this.users = response.users;
        setInterval(() => {
          this.loading = false;
        }, 1000);
      });
  }

  changeOffset(value: number) {
    const offset = this.offset + value;
    if (offset >= this.countUsers) {
      return;
    }
    if (offset < 0) {
      return;
    }
    this.offset += value;
    this.loadUsers();
  }

  searchUsers(term: string) {

    if (term.length === 0) {
      this.loadUsers();
      return;
    }
    this.loading = true;
    this.userService.searchUsers(term)
      .subscribe((response: User[]) => {
        this.users = response;
        setInterval(() => {
          this.loading = false;
        }, 1000);
      });
  }

  deleteUser(user: any) {
    if (user._id === this.userService.user.getId()) {
      Swal.fire({
        type: 'error',
        title: 'Oops...',
        text: 'No es posible eliminar su propio usuario!',
        footer: ''
      });
      return;
    }

    Swal.fire({
      title: '¿Está seguro?',
      text: 'Está a punto de borrar a ' + user.name,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrar usuario!'
    }).then((result) => {
      if (result.value) {
        this.userService.deleteUser(user._id)
          .subscribe((response: any) => {
            if (response.OK) {
              this.countUsers -= 1;
              if (this.offset >= this.countUsers) {
                this.offset = 0;
              }
              this.loadUsers();
              Swal.fire({
                type: 'success',
                title: `El usuario ${user.name} ${user.lastname} ha sido borrado correctamente`,
                showConfirmButton: false,
                footer: '',
                timer: 2500
              });
            } else {
              Swal.fire({
                type: 'error',
                title: `Ha ocurrido un error.`,
                text: ` El usuario ${user.name + user.lastname} no ha sido borrado correctamente`,
                showConfirmButton: false,
                footer: '',
                timer: 2500
              });
            }
          });
      }
    });
  }

  saveUser(user: User) {
    this.userService.updateUser(user)
      .subscribe();
  }

  showModal(id: string) {
    this.modalUploadService.showModal('users', id);
  }

}

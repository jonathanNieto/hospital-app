import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/service.index';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  user: User;
  image: File;
  tempImage: string;
  searchValue = '';

  constructor(public userService: UserService) {
    this.user = this.userService.user;
  }

  ngOnInit() {
  }

  save(user: any) {
    this.user.setName(user.name);
    this.user.setLastname(user.lastname);
    if (!this.user.isGoogle()) {
      this.user.setEmail(user.email);
    }
    this.userService.updateUser(this.user)
      .subscribe(
        (response) => console.log({ response }),
        (error) => {
          console.log({ error });
          const showError = error.error.errors.message;
          Swal.fire({
            title: 'Oops ... :( !',
            text: `${showError}`,
            type: 'error',
            confirmButtonText: 'OK'
          });
        }
      );
  }
  imageSelected(event) {
    const image = event.target.files[0];
    if (!image) {
      this.image = null;
      return;
    }
    const typeImg = image.type;
    if (!typeImg.startsWith('imag')) {
      Swal.fire({
        title: 'Oops ... :( !',
        text: `Solo se permiten imagenes`,
        type: 'error',
        confirmButtonText: 'OK'
      });
      this.image = null;
      return;
    }
    this.image = image;

    const reader = new FileReader();
    const urlTempImage = reader.readAsDataURL(image);
    reader.onloadend = () => this.tempImage = reader.result.toString();
  }

  changeImage() {
    this.userService.changeImage(this.image, this.user.getId());
    this.searchValue = null;
  }
}

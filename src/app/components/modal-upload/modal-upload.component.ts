import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { UploadFileService } from 'src/app/services/service.index';
import { ModalUploadService } from './modal-upload.service';


@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {

  image: File;
  tempImage: string;
  searchValue = '';

  constructor(public uploadFileService: UploadFileService, public modalUploadService: ModalUploadService) { }

  ngOnInit() {
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

  uploadModal() {
    this.uploadFileService.uploadFile(this.image, this.modalUploadService.collection, this.modalUploadService.id)
        .then( (response) => {
          console.log({ response});
          this.modalUploadService.notification.emit(response);
          this.modalUploadService.hideModal();
        })
        .catch((error) => {
          console.log({error});
        });
  }

  closeModal() {
    this.image = null;
    this.imageSelected = null;
    this.modalUploadService.hideModal();
  }
}

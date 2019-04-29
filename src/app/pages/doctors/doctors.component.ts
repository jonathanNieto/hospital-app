import { Component, OnInit } from '@angular/core';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';
import { DoctorService } from 'src/app/services/service.index';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styles: []
})
export class DoctorsComponent implements OnInit {

  loading = true;
  countDoctors = 0;
  offset = 0;
  doctors = [];

  constructor(public modalUploadService: ModalUploadService, public doctorService: DoctorService) { }

  ngOnInit() {
    this.loadDoctors();
  }

  loadDoctors() {
    this.loading = true;
    this.doctorService.loadDoctors(this.offset)
      .subscribe((response: any) => {
        this.countDoctors = response.length;
        this.doctors = response.doctors;
        setInterval(() => {
          this.loading = false;
        }, 500);
      });
  }

  searchDoctors(term: string) {
    if (term.length === 0) {
      this.loadDoctors();
      return;
    }
    this.loading = true;
    this.doctorService.searchDoctors(term)
      .subscribe((response) => {
        this.countDoctors = this.doctorService.countDoctors;
        this.doctors = response;
        setInterval(() => {
          this.loading = false;
        }, 500);
      });
  }

  createDoctor() {

  }

  saveDoctor(doctor, inputName: string) {

  }

  deleteDoctor(doctor) {
    console.log('delete doctor: ');
    console.log({doctor});
    Swal.fire({
      title: '¿Está seguro?',
      text: `Está a punto de borrar a ${doctor.name} ${doctor.lastname}`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrar médico!'
    }).then((result) => {
      if (result.value) {
        console.log('result value');
        console.log({result});
        this.doctorService.deleteDoctor(doctor._id)
          .subscribe((response: any) => {
            console.log({response});
            if (response.OK) {
              this.countDoctors -= 1;
              if (this.offset >= this.countDoctors) {
                this.offset = 0;
              }
              this.loadDoctors();
              Swal.fire({
                type: 'success',
                title: `El médico ${doctor.name} ha sido borrado correctamente`,
                showConfirmButton: false,
                footer: '',
                timer: 2500
              });
            } else {
              Swal.fire({
                type: 'error',
                title: `Ha ocurrido un error.`,
                text: ` El médico: ${doctor.name} ${doctor.lastname} no ha sido borrado correctamente`,
                showConfirmButton: false,
                footer: '',
                timer: 2500
              });
            }
          });
      }
    });
  }

  changeOffset(value: number) {
    const offset = this.offset + value;
    if (offset >= this.countDoctors) {
      return;
    }
    if (offset < 0) {
      return;
    }
    this.offset += value;
    this.loadDoctors();
  }

  showModal(id: string) {
    this.modalUploadService.showModal('doctors', id);
  }

}

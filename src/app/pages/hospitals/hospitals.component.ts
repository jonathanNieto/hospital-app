import { Component, OnInit } from '@angular/core';
import { HospitalService } from 'src/app/services/service.index';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styles: []
})
export class HospitalsComponent implements OnInit {

  hospitals: any[] = [];
  offset = 0;
  countHospital = 0;
  loading = true;

  constructor(public hospitalService: HospitalService, public modalUploadService: ModalUploadService) { }

  ngOnInit() {
    this.loadHospitals();
    this.modalUploadService.notification
      .subscribe((response) => {
        this.loadHospitals();
      });
  }

  loadHospitals() {
    this.loading = true;
    this.hospitalService.loadHospitals(this.offset)
      .subscribe((response: any) => {
        this.countHospital = response.length;
        this.hospitals = response.hospitals;
        setInterval(() => {
          this.loading = false;
        }, 1000);
      });
  }

  searchHospitals(term: string) {
    if (term.length === 0) {
      this.loadHospitals();
      return;
    }
    this.loading = true;
    this.hospitalService.searchHospitals(term)
      .subscribe((response) => {
        this.hospitals = response;
        setInterval(() => {
          this.loading = false;
        }, 1000);
      });
  }

  changeOffset(value: number) {
    const offset = this.offset + value;
    if (offset >= this.countHospital) {
      return;
    }
    if (offset < 0) {
      return;
    }
    this.offset += value;
    this.loadHospitals();
  }

  showModal(id: string) {
    this.modalUploadService.showModal('hospitals', id);
  }

  saveHospital(hospital: any, name: string) {
    console.log({ hospital });
    this.hospitalService.updateHospital(hospital, name)
      .subscribe();
  }

  deleteHospital(hospital) {
    Swal.fire({
      title: '¿Está seguro?',
      text: 'Está a punto de borrar a ' + hospital.name,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrar hospital!'
    }).then((result) => {
      if (result.value) {
      this.hospitalService.deleteHospital(hospital._id)
          .subscribe((response: any) => {
            if (response.OK) {
              this.countHospital -= 1;
              if (this.offset >= this.countHospital) {
                this.offset = 0;
              }
              this.loadHospitals();
              Swal.fire({
                type: 'success',
                title: `El hospital ${hospital.name} ha sido borrado correctamente`,
                showConfirmButton: false,
                footer: '',
                timer: 2500
              });
            } else {
              Swal.fire({
                type: 'error',
                title: `Ha ocurrido un error.`,
                text: ` El hospital: ${hospital.name} no ha sido borrado correctamente`,
                showConfirmButton: false,
                footer: '',
                timer: 2500
              });
            }
          });
      }
    });
  }

  createHospital() {
    this.hospitalService.createHospital()
      .then((response) => {
        if (response === undefined) {
          return;
        }
        console.log({ response });
        response.subscribe((params) => {
          console.log({ params });
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getHospital(id: string) {
    this.hospitalService.getHospital(id)
      .subscribe((response) => {
        console.log(response);
      })
  }

}

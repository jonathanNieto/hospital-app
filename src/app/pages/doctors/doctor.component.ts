import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DoctorService, HospitalService } from 'src/app/services/service.index';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styles: []
})
export class DoctorComponent implements OnInit {

  hospitals: any[];
  doctor = {
    name: '',
    lastname: '',
    hospital: {},
    _id: '',
    img: '',
    hospitalId: ''
  };
  hospital = {
    name: '',
    img: '',
    _id: ''
  };
  constructor(public doctorService: DoctorService, public hospitalService: HospitalService, public router: Router, public activatedRoute: ActivatedRoute, public modalUploadService: ModalUploadService) {
    activatedRoute.params.subscribe((params) => {
      const id = params['id'];
      if (id !== 'new') {
        this.loadDoctor(id);
      }
    });
  }

  ngOnInit() {
    this.hospitalService.loadAllHospitals()
      .subscribe((response: any) => {
        this.hospitals = response.hospitals;
      });
    this.modalUploadService.notification.subscribe((response: any) => {
      this.doctor.img = response.doctor.img;
    });
  }

  loadDoctor(id: string) {
    this.doctorService.loadDoctor(id)
      .subscribe((response) => {
        this.doctor = response;
        this.hospital._id = response.hospital._id;
        this.hospital.name = response.hospital.name;
        this.hospital.img = response.hospital.img;
        this.doctor.hospital = this.hospital;
        this.doctor.hospitalId = this.hospital._id;
        this.changeHospital(this.hospital._id);
      });
  }

  saveDoctor(formulario: NgForm) {
    if (!formulario.valid) {
      return;
    }

    this.doctorService.saveDoctor(this.doctor)
      .subscribe((doctor) => {
        this.doctor._id = doctor._id;
        this.router.navigate(['/doctor', doctor._id]);
      });
  }

  changeHospital(event) {
    this.hospitalService.getHospital(event)
      .subscribe((response: any) => {
        this.hospital.name = response.hospital.name;
        this.hospital.img = response.hospital.img;
      });
  }

  showModal(id: string) {
    this.modalUploadService.showModal('doctors', id);
  }

}

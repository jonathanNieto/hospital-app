import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  countDoctors = 0;
  token: string;

  constructor(public http: HttpClient) {
    this.loadStorage();
  }

  loadDoctors(offset: number = 0) {
    const url = `${environment.url}/doctor?offset=${offset}`;
    return this.http.get(url);
  }

  loadDoctor(id: string) {
    const url = `${environment.url}/doctor/${id}`;
    return this.http.get(url).pipe(map((response: any) => response.doctor));
  }

  searchDoctors(term: string) {
    const url = `${environment.url}/search/doctor/${term}`;
    return this.http.get(url).pipe(
      map((response: any) => {
        this.countDoctors = response.doctors.length;
        return response.doctors;
      })
    );
  }

  deleteDoctor(id: string) {
    const url = `${environment.url}/doctor/${id}?token=${this.token}`;
    console.log({ url });
    return this.http.delete(url);
  }

  loadStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
    } else {
      this.token = '';
    }
  }

  saveDoctor(doctor: any) {
    if (doctor._id) {
      const url = `${environment.url}/doctor/${doctor._id}?token=${this.token}`;
      return this.http.put(url, doctor).pipe(
        map((response: any) => {
          if (response.OK) {
            Swal.fire({
              title: 'Médico Actualizado!',
              text: `${response.doctor.name} ${response.doctor.lastname}`,
              type: 'success',
              confirmButtonText: 'OK'
            });
            return response.doctor;
          } else {
            Swal.fire({
              title: 'Oops ...!',
              text: `Ha ocurrido un error`,
              type: 'error',
              confirmButtonText: 'OK'
            });
            return null;
          }
        })
      );
    } else {
      console.log('create a doctor', doctor);
      const url = `${environment.url}/doctor?token=${this.token}`;
      return this.http.post(url, doctor).pipe(
        map((response: any) => {
          if (response.OK) {
            Swal.fire({
              title: 'Médico creado!',
              text: `${response.doctor.name} ${response.doctor.lastname}`,
              type: 'success',
              confirmButtonText: 'OK'
            });
            return response.doctor;
          } else {
            Swal.fire({
              title: 'Oops ...!',
              text: `Ha ocurrido un error`,
              type: 'error',
              confirmButtonText: 'OK'
            });
            return null;
          }
        })
      );
    }
  }
}

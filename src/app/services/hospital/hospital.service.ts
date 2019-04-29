import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  token: string;

  constructor(public http: HttpClient) { 
    this.loadStorage();
  }

  loadHospitals(offset: number = 0) {
    const url = `${environment.url}/hospital?offset=${offset}`;
    return this.http.get(url);
  }

  loadAllHospitals() {
    const url = `${environment.url}/hospital/all`;
    return this.http.get(url);
  }

  searchHospitals(term: string) {
    const url = `${environment.url}/search/hospital/${term}`;
    return this.http.get(url).pipe(
      map((response: any) => {
        return response.hospitals;
      })
    );
  }

  loadStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
    } else {
      this.token = '';
    }
  }

  deleteHospital(id: string) {
    const url = `${environment.url}/hospital/${id}?token=${this.token}`;
    return this.http.delete(url);
  }

  async createHospital() {
    const {value: name} = await Swal.fire({
      title: 'Nombre del hospital: ',
      input: 'text',
      inputValue: '',
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return 'Necesita escribir el nombre!'
        }
      }
    });
    if (name === undefined )  {
      return;
    }
    const url = `${environment.url}/hospital?token=${this.token}`;
    const hospital = { name };
    return this.http.post(url, hospital).pipe(
      map((response: any) => {
        Swal.fire({
          title: 'Hospital creado!',
          text: response.name,
          type: 'success',
          confirmButtonText: 'OK'
        });
        return response;
      }));
  }

  getHospital(id: string) {
    const url = `${environment.url}/hospital/${id}`;
    return this.http.get(url);
  }

  updateHospital(hospital: any, name: string) {
    const id = hospital._id;
    hospital.name = name;
    const url = `${environment.url}/hospital/${id}?token=${this.token}`;
    return this.http.put(url, hospital).pipe(
      map((response: any) => {
        if (response.OK) {
          const name = response.hospital.name;
          Swal.fire({
            title: 'Hospital actualizado!',
            text: `${name}`,
            type: 'success',
            confirmButtonText: 'OK'
          });
          return true;
        } else{
          return false;
        }
        
      })
    );
  }
}

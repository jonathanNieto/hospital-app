import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  constructor() { }

  uploadFile(file: File, collection: string, id: string) {
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      const xhr = new XMLHttpRequest();

      formData.append('image', file, file.name);
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(JSON.parse(xhr.response));
          } else {
            console.log('failed');
            reject(JSON.parse(xhr.response));
          }
        }
      };
      const url = `${environment.url}/upload/${collection}/${id}`;
      xhr.open('PUT', url, true);
      xhr.send(formData);
    });

  }
}

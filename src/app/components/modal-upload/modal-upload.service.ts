import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalUploadService {

  public collection: string;
  public id: string;
  public hide: string = 'hide';

  public notification = new EventEmitter<any>();

  constructor() { 
    console.log('modal service is ready');
  }

  hideModal() {
    this.hide = 'hide';
    this.collection = null;
    this.id = null;
  }

  showModal(collection: string, id: string) {
    console.log('showModal');
    this.collection = collection;
    this.id = id;
    this.hide = '';
  }
  
}

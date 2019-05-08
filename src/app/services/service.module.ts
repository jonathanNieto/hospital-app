import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { ModalUploadService } from '../components/modal-upload/modal-upload.service';

import {
  SettingsService,
  SidebarService,
  SharedService,
  UserService,
  UploadFileService,
  HospitalService,
  DoctorService,
  LoginGuardGuard,
  AdminGuard
} from './service.index';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    SettingsService,
    SidebarService,
    SharedService,
    UserService,
    UploadFileService,
    ModalUploadService,
    HospitalService,
    DoctorService,
    LoginGuardGuard,
    AdminGuard
  ]
})
export class ServiceModule { }

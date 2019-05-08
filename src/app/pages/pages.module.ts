import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';

import { PagesComponent } from './pages.component';

import { FormsModule } from '@angular/forms';


/* components */
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graph1Component } from './graph1/graph1.component';
import { IncreaserComponent } from '../components/increaser/increaser.component';
import { DoughnutChartComponent } from '../components/doughnut-chart/doughnut-chart.component';
import { AccountSettingsComponent } from '../components/account-settings/account-settings.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './users/users.component';
import { ModalUploadComponent } from '../components/modal-upload/modal-upload.component';
import { HospitalsComponent } from './hospitals/hospitals.component';

/* routes */
import { PagesRoutingModule } from './pages.routing';

/* charts */
import { ChartsModule } from 'ng2-charts';

/* pipe module */
import { PipesModule } from '../pipes/pipes.module';
import { DoctorsComponent } from './doctors/doctors.component';
import { DoctorComponent } from './doctors/doctor.component';
import { SearchComponent } from './search/search.component';




@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    ProgressComponent,
    Graph1Component,
    IncreaserComponent,
    DoughnutChartComponent,
    AccountSettingsComponent,
    PromisesComponent,
    RxjsComponent,
    ProfileComponent,
    UsersComponent,
    ModalUploadComponent,
    HospitalsComponent,
    DoctorsComponent,
    DoctorComponent,
    SearchComponent,
  ],
  exports: [
    DashboardComponent,
    ProgressComponent,
    Graph1Component,
  ],
  imports: [
    CommonModule,
    SharedModule,
    PagesRoutingModule,
    FormsModule,
    ChartsModule,
    PipesModule
  ]
})
export class PagesModule { }

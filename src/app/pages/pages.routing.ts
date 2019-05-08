import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graph1Component } from './graph1/graph1.component';
import { AccountSettingsComponent } from '../components/account-settings/account-settings.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './users/users.component';
import { HospitalsComponent } from './hospitals/hospitals.component';
import { DoctorsComponent } from './doctors/doctors.component';
import { DoctorComponent } from './doctors/doctor.component';
import { SearchComponent } from './search/search.component';

import { LoginGuardGuard } from '../services/guards/login-guard.guard';
import { AdminGuard } from '../services/service.index';

const routes: Routes = [
    {
        path: '', component: PagesComponent,
        canActivate: [LoginGuardGuard],
        children: [
            { path: 'dashboard', component: DashboardComponent, data: { title: 'Dashboard' } },
            { path: 'progress', component: ProgressComponent, data: { title: 'Progress' } },
            { path: 'graph1', component: Graph1Component, data: { title: 'Gráficas' } },
            { path: 'promises', component: PromisesComponent, data: { title: 'Promesas' } },
            { path: 'rxjs', component: RxjsComponent, data: { title: 'Rxjs' } },
            { path: 'account-settings', component: AccountSettingsComponent, data: { title: 'Configuración' } },
            { path: 'profile', component: ProfileComponent, data: { title: 'Perfil de usuario' } },
            { path: 'search/:term', component: SearchComponent, data: { title: 'Buscador' } },
            /* manteniminetos */
            {   path: 'users', 
                component: UsersComponent, 
                canActivate: [AdminGuard],
                data: { title: 'Mantenimiento de usuarios' } 
            },
            { path: 'hospitals', component: HospitalsComponent, data: { title: 'Mantenimiento de hospitales' } },
            { path: 'doctors', component: DoctorsComponent, data: { title: 'Mantenimiento de medicos' } },
            { path: 'doctor/:id', component: DoctorComponent, data: { title: 'Actualizar medico' } },
            { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule { }

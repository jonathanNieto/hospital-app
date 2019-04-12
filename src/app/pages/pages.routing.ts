import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graph1Component } from './graph1/graph1.component';
import { AccountSettingsComponent } from '../components/account-settings/account-settings.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';

const routes: Routes = [
    {
        path: '', component: PagesComponent,
        children: [
            { path: 'dashboard', component: DashboardComponent, data: { title: 'Dashboard' } },
            { path: 'progress', component: ProgressComponent, data: { title: 'Progress' } },
            { path: 'graph1', component: Graph1Component, data: { title: 'Gráficas' } },
            { path: 'promises', component: PromisesComponent, data: { title: 'Promesas' } },
            { path: 'rxjs', component: RxjsComponent, data: { title: 'Rxjs' } },
            { path: 'account-settings', component: AccountSettingsComponent, data: { title: 'Configuración' } },
            { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule { }

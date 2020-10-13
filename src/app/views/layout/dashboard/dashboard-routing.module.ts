import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuard} from '../../../shared/guard';
import {DashboardComponent} from './dashboard.component';


const routes: Routes = [
  {
    path: '', data: {title: 'dashboard'}, children: [
      {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }

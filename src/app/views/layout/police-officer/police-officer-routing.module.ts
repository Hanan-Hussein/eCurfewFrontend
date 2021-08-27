import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuard} from '../../../shared/guard';
import {PoliceOfficerComponent} from './listpolice-officer/police-officer.component';
import { CreatePoliceOfficerComponent } from './create-police-officer/create-police-officer.component';
import { ApprovePoliceOfficerComponent } from './approve-police-officer/approve-police-officer.component';
import { LockedPoliceOfficerComponent } from './locked-police-officer/locked-police-officer.component';

const routes: Routes = [
  {
    path: '', data: {title: 'customers'}, children: [
      {path: 'policeofficer', component: PoliceOfficerComponent, data: {title: 'Police Officer'}, canActivate: [AuthGuard]},
    //   {path: 'customers/:id/view-customer', component: ViewCustomerComponent, data: {title: 'View Customer'}, canActivate: [AuthGuard]},
      {path: 'create-police-officer', component: CreatePoliceOfficerComponent, canActivate: [AuthGuard]},
      {path: 'approve-police-officer', component: ApprovePoliceOfficerComponent, canActivate: [AuthGuard]},
      {path: 'locked-police-officer', component: LockedPoliceOfficerComponent, canActivate: [AuthGuard]}

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
  export class PoliceOfficerRoutingModule { }

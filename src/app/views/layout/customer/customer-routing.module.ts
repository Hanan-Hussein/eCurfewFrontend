import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuard} from '../../../shared/guard';
import {CustomerComponent} from './customer/customer.component';
import {ViewCustomerComponent} from './view-customer/view-customer.component';
import { CreatecustomerComponent } from './createcustomer/createcustomer.component';
import { ApproveCustomerComponent } from './approve-customer/approve-customer.component';

const routes: Routes = [
  {
    path: '', data: {title: 'customers'}, children: [
      {path: 'customers', component: CustomerComponent, data: {title: 'Customers'}, canActivate: [AuthGuard]},
      {path: 'customers/:id/view-customer', component: ViewCustomerComponent, data: {title: 'View Customer'}, canActivate: [AuthGuard]},
      {path: 'customers/create-customer', component: CreatecustomerComponent, canActivate: [AuthGuard]},

      {path: 'customers/approve-customer', component: ApproveCustomerComponent, canActivate: [AuthGuard]},

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
  export class CustomerRoutingModule { }

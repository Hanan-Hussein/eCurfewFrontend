import { Routes, RouterModule } from '@angular/router';
import { ListmerchantsComponent } from './merchants/listmerchants/listmerchants.component';
import {AuthGuard} from '../../../shared/guard';
import { CreatemerchantsComponent } from './merchants/createmerchants/createmerchants.component';

import { ApproveMerchantsComponent } from './merchants/approve-merchants/approve-merchants.component';
import { NgModule } from '@angular/core';
import { MerchantDashboardComponent } from './merchants-dashboard/merchant-dashboard/merchant-dashboard.component';

const routes: Routes = [
    {
      path: '', data: {title: 'merchants-management'}, children: [
        {path: 'merchants', component: ListmerchantsComponent, canActivate: [AuthGuard]},
        {path: 'merchants-dashboard', component: MerchantDashboardComponent, canActivate: [AuthGuard]},
        {path: 'merchants/create-merchant', component: CreatemerchantsComponent, canActivate: [AuthGuard]},
        {path: 'merchants/:id/view-merchant', component: CreatemerchantsComponent, canActivate: [AuthGuard]},
        {path: 'merchants/approve-merchant', component: ApproveMerchantsComponent, canActivate: [AuthGuard]},
 
      ]
    }
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class MerchantsManagementRoutingModule { }
  
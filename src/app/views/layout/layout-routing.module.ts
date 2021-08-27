import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)},
  {
    path: 'user-management',
    loadChildren: () => import('./user-management/user-management.module').then(m => m.UserManagementModule)
  },
  {
    path: 'merchants-management',
    loadChildren: () => import('./merchants-management/merchants-management.module').then(m => m.MerchantManagementModule)
  },
  {path: 'reports', loadChildren: () => import('./reports/reports.module').then(m => m.ReportsModule)},
  {path: 'customers', loadChildren: () => import('./customer/customer.module').then(m => m.CustomerModule)},
  {path: 'master-data', loadChildren: () => import('./master-data/master-data.module').then(m => m.MasterDataModule)},
  {path: 'police', loadChildren: () => import('./police-officer/police-officer.module').then(m => m.PoliceOfficerModule)},
  {
    path: 'system-config',
    loadChildren: () => import('./system-config/system-config.module').then(m => m.SystemConfigModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule {
}

import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CountriesComponent} from './countries/countries.component';
import {AuthGuard} from '../../../shared/guard';
import {CurrencyComponent} from './currency/currency.component';
import {AddCountryComponent} from './countries/add-country/add-country.component';
import {ApproveCountryComponent} from './countries/approve-country/approve-country.component';
import {AddCurrencyComponent} from './currency/add-currency/add-currency.component';
import {ApproveCurrencyComponent} from './currency/approve-currency/approve-currency.component';
import {IndustryComponent} from './industry/industry.component';
import {AddIndustryComponent} from './industry/add-industry/add-industry.component';
import {ApproveIndustryComponent} from './industry/approve-industry/approve-industry.component';
import {SectorComponent} from './sector/sector.component';
import {AddSectorComponent} from './sector/add-sector/add-sector.component';
import {ApproveSectorComponent} from './sector/approve-sector/approve-sector.component'
import {CustomerStatusComponent} from './customer-status/customer-status.component';
import {AddCustomerStatusComponent} from './customer-status/add-customer-status/add-customer-status.component';
import {ApproveCustomerStatusComponent} from './customer-status/approve-customer-status/approve-customer-status.component';
import {AccountOfficerComponent} from './account-officer/account-officer.component';
import {AddAccountOfficerComponent} from './account-officer/add-account-officer/add-account-officer.component';
import {ApproveAccountOfficerComponent} from './account-officer/approve-account-officer/approve-account-officer.component';
import { PoliceStationComponent } from './police-station/police-station.component';
import { AddPoliceStationComponent } from './police-station/add-police-station/add-police-station.component';
import { RankComponent } from './rank/rank.component';
import { AddRankComponent } from './rank/add-rank/add-rank.component';
import { from } from 'rxjs';

const routes: Routes = [
  {path: 'countries', component: CountriesComponent, data: {title: 'Countries'}, canActivate: [AuthGuard]},
  {path: 'add-country', component: AddCountryComponent, data: {title: 'Add Countries'}, canActivate: [AuthGuard]},
  {
    path: 'approve-country',
    component: ApproveCountryComponent,
    data: {title: 'Approve Countries'},
    canActivate: [AuthGuard]
  },
  {
    path: 'countries/:id/view-country',
    component: AddCountryComponent,
    data: {title: 'View Countries'},
    canActivate: [AuthGuard]
  },
  {path: 'currency', component: CurrencyComponent, data: {title: 'Currency'}, canActivate: [AuthGuard]},
  {path: 'add-currency', component: AddCurrencyComponent, data: {title: 'Add Currency'}, canActivate: [AuthGuard]},
  {
    path: 'approve-currency',
    component: ApproveCurrencyComponent,
    data: {title: 'Approve Currency'},
    canActivate: [AuthGuard]
  },
  {
    path: 'currency/:id/view-currency',
    component: AddCurrencyComponent,
    data: {title: 'View Currency'},
    canActivate: [AuthGuard]
  },
  {path: 'industry', component: IndustryComponent, data: {title: 'Industries'}, canActivate: [AuthGuard]},
  {path: 'add-industry', component: AddIndustryComponent, data: {title: 'Add Industry'}, canActivate: [AuthGuard]},
  {
  path: 'approve-industry',
  component: ApproveIndustryComponent,
  data: {title: 'Approve Industry'},
   canActivate: [AuthGuard]
  },
  {
    path: 'industry/:id/view-industry',
    component: AddIndustryComponent,
    data: {title: 'View Industry'},
    canActivate: [AuthGuard]
  },
  {path: 'police-station', component: PoliceStationComponent, data: {title: 'PoliceStation'}, canActivate: [AuthGuard]},
  {path: 'add-police-station', component: AddPoliceStationComponent, data: {title: 'Add Police Station'}, canActivate: [AuthGuard]},
  {
    path: 'police-station/:id/view-police-station',
    component: AddPoliceStationComponent,
    data: {title: 'View Police Statiom'},
    canActivate: [AuthGuard]
  },
  {path: 'sector', component: SectorComponent, data: {title: 'Sectors'}, canActivate: [AuthGuard]},
  {path: 'rank', component: RankComponent, data: {title: 'Rank'}, canActivate: [AuthGuard]},
  {path: 'add-rank', component: AddRankComponent, data: {title: 'Add Rank'}, canActivate: [AuthGuard]},
  {path: 'add-sector', component: AddSectorComponent, data: {title: 'Add Sectors'}, canActivate: [AuthGuard]},

  {
   path: 'approve-sector',
   component: ApproveSectorComponent,
   data: {title: 'Approve Sectors'},
   canActivate: [AuthGuard]
  },

  {
    path: 'sector/:id/view-sector',
    component: AddSectorComponent,
    data: {title: 'View Sector'},
    canActivate: [AuthGuard]
  },

  {path: 'customer-status', component: CustomerStatusComponent, data: {title: 'Customer Status'}, canActivate: [AuthGuard]},
  {path: 'add-customer-status', component: AddCustomerStatusComponent, data: {title: 'Add Customer Status'}, canActivate: [AuthGuard]},
  {
   path: 'approve-customer-status',
   component: ApproveCustomerStatusComponent,
   data: {title: 'Approve Customer Status'},
   canActivate: [AuthGuard]
   },
   {
    path: 'customer-status/:id/view-customer-status',
    component: AddCustomerStatusComponent,
    data: {title: 'View Customer Status'},
    canActivate: [AuthGuard]
  },

  {path: 'account-officer', component: AccountOfficerComponent, data: {title: 'Account Officer'}, canActivate: [AuthGuard]},
  {path: 'add-account-officer', component: AddAccountOfficerComponent, data: {title: 'Add Account Officer'}, canActivate: [AuthGuard]},
  {
    path: 'approve-account-officer',
    component: ApproveAccountOfficerComponent,
    data: {title: 'Add Account Officer'},
    canActivate: [AuthGuard]
  },
  {
    path: 'account-officer/:id/view-account-officer',
    component: AddAccountOfficerComponent,
    data: {title: 'View Account Officer'},
    canActivate: [AuthGuard]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterDataRoutingModule {
}

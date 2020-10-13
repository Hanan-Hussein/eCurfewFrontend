import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CountriesComponent} from './countries/countries.component';
import {AuthGuard} from '../../../shared/guard';
import {CurrencyComponent} from './currency/currency.component';
import {AddCountryComponent} from './countries/add-country/add-country.component';
import {ApproveCountryComponent} from './countries/approve-country/approve-country.component';
import {AddCurrencyComponent} from './currency/add-currency/add-currency.component';
import {ApproveCurrencyComponent} from './currency/approve-currency/approve-currency.component';


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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterDataRoutingModule {
}

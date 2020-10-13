import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MasterDataRoutingModule} from './master-data-routing.module';
import {CountriesComponent} from './countries/countries.component';
import {CurrencyComponent} from './currency/currency.component';
import {UtilModule} from '../util/util.module';
import {AddCountryComponent} from './countries/add-country/add-country.component';
import {ApproveCountryComponent} from './countries/approve-country/approve-country.component';
import {AddCurrencyComponent} from './currency/add-currency/add-currency.component';
import {ApproveCurrencyComponent} from './currency/approve-currency/approve-currency.component';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [CountriesComponent, CurrencyComponent, AddCountryComponent, ApproveCountryComponent,  AddCurrencyComponent, ApproveCurrencyComponent],
  imports: [
    CommonModule,
    UtilModule,
    MasterDataRoutingModule,
    FormsModule
  ]
})
export class MasterDataModule { }

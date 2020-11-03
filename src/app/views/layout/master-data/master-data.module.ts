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
import { IndustryComponent } from './industry/industry.component';
import { CustomerStatusComponent } from './customer-status/customer-status.component';
import { SectorComponent } from './sector/sector.component';
import { AccountOfficerComponent } from './account-officer/account-officer.component';
import { AddIndustryComponent } from './industry/add-industry/add-industry.component';
import { ApproveIndustryComponent } from './industry/approve-industry/approve-industry.component';
import { AddCustomerStatusComponent } from './customer-status/add-customer-status/add-customer-status.component';
import { ApproveCustomerStatusComponent } from './customer-status/approve-customer-status/approve-customer-status.component';
import { AddSectorComponent } from './sector/add-sector/add-sector.component';
import { ApproveSectorComponent } from './sector/approve-sector/approve-sector.component';
import { AddAccountOfficerComponent } from './account-officer/add-account-officer/add-account-officer.component';
import { ApproveAccountOfficerComponent } from './account-officer/approve-account-officer/approve-account-officer.component';


@NgModule({
  declarations: [CountriesComponent, CurrencyComponent, AddCountryComponent, ApproveCountryComponent,  AddCurrencyComponent, ApproveCurrencyComponent, IndustryComponent, CustomerStatusComponent, SectorComponent, AccountOfficerComponent, AddIndustryComponent, ApproveIndustryComponent, AddCustomerStatusComponent, ApproveCustomerStatusComponent, AddSectorComponent, ApproveSectorComponent, AddAccountOfficerComponent, ApproveAccountOfficerComponent],
  imports: [
    CommonModule,
    UtilModule,
    MasterDataRoutingModule,
    FormsModule
  ]
})
export class MasterDataModule { }

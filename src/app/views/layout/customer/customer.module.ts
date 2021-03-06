import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerComponent } from './customer/customer.component';
import {CustomerRoutingModule} from './customer-routing.module';
import {UtilModule} from '../util/util.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';

import {AgmCoreModule} from '@agm/core';
import { ApproveCustomerComponent } from './approve-customer/approve-customer.component';
import { CreatecustomerComponent } from './createcustomer/createcustomer.component';
import {ViewCustomerComponent} from './view-customer/view-customer.component';

import { DeleteDialogComponent } from '../util/functionality-buttons/delete-dialog/delete-dialog.component';
import { ApproveDialogComponent } from '../util/functionality-buttons/approve-dialog/approve-dialog.component';
import { DeclineDialogComponent } from '../util/functionality-buttons/decline-dialog/decline-dialog.component';
import { UfsExportService } from '../util/ufs-export.service';
import { DataTablesModule } from 'angular-datatables';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTabsModule } from '@angular/material/tabs';
import { FormWizardModule } from 'angular2-wizard';
import { NgxTreeSelectModule, ExpandMode } from 'ngx-tree-select';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CdkTableModule } from '@angular/cdk/table';
import { AuthenticateTransactionComponent } from './authenticate-transaction/authenticate-transaction.component';

@NgModule({
  declarations: [
    CustomerComponent,
      ApproveCustomerComponent,
      ViewCustomerComponent,
      CreatecustomerComponent,
      AuthenticateTransactionComponent],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    DataTablesModule,
    UtilModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatStepperModule,
    MatRadioModule,
    MatCardModule,
    MatExpansionModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSlideToggleModule,
    MatAutocompleteModule,
    MatTabsModule,
    FormsModule,
    FormWizardModule,
    NgxTreeSelectModule.forRoot({
      allowFilter: true,
      filterPlaceholder: 'Type your filter here...',
      maxVisibleItemCount: 10,
      idField: 'unitItemId',
      textField: 'name',
      childrenField: 'children',
      allowParentSelection: true,
      expandMode: ExpandMode.Selection
    }),
    ReactiveFormsModule,
    MatTableModule,
    MatCheckboxModule,
    CdkTableModule,
  ],
  entryComponents: [
    DeleteDialogComponent,
    ApproveDialogComponent,
    DeclineDialogComponent
  ],
  providers: [UfsExportService]
})
export class CustomerModule { }

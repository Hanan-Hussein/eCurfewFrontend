import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UtilRoutingModule} from './util-routing.module';
import {CustomDatatableComponent} from './custom-datatable/custom-datatable.component';
import {DateFilterComponent} from './date-filter/date-filter.component';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatNativeDateModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {DataTablesModule} from 'angular-datatables';
import {FunctionalityButtonsComponent} from './functionality-buttons/functionality-buttons.component';
import {DeleteDialogComponent} from './functionality-buttons/delete-dialog/delete-dialog.component';
import {ApproveDialogComponent} from './functionality-buttons/approve-dialog/approve-dialog.component';
import {DeclineDialogComponent} from './functionality-buttons/decline-dialog/decline-dialog.component';
import {DtServiceService} from '../../../shared/services/datatable-service/dt-service.service';
import {Notify} from '../../../shared/class/notify';
import {ViewentityComponent} from './viewentity/viewentity.component';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {CapitalizePipe} from '../../../shared/pipe/capitalize.pipe';
import {BackComponentComponent} from './functionality-buttons/back-button/back-component.component';
import {RefreshComponentComponent} from './functionality-buttons/refresh-button/refresh-component.component';

const COMPONENTS = [
  CustomDatatableComponent,
  DateFilterComponent,
  FunctionalityButtonsComponent,
  DeleteDialogComponent,
  ApproveDialogComponent,
  DeclineDialogComponent,
  ViewentityComponent,
  CapitalizePipe,
  RefreshComponentComponent,
  BackComponentComponent
];

const EXPORT_COMPONENTS = [
  CustomDatatableComponent,
  DateFilterComponent,
  ViewentityComponent,
  CapitalizePipe,
  FunctionalityButtonsComponent
];


@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    CommonModule,
    UtilRoutingModule,
    FormsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
    DataTablesModule,
    MatButtonModule,
    MatDialogModule,
    MatNativeDateModule,
    MatCardModule,
    MatDividerModule
  ],
  exports: [
    ...EXPORT_COMPONENTS,
    BackComponentComponent,
    RefreshComponentComponent
  ],
  entryComponents: [
    DeleteDialogComponent,
    ApproveDialogComponent,
    DeclineDialogComponent
  ],
  providers: [
    Notify,
    DtServiceService
  ]
})
export class UtilModule {
}

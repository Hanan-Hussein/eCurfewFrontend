import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UtilModule} from '../util/util.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';

import {AgmCoreModule} from '@agm/core';
import { CitizenFinesRoutingModule } from './citizen-fines-routing.module';
import { CreateEssentialWorkersComponent } from './create-essential-workers/create-essential-workers.component';
import { ListEssentialWorkersComponent } from './list-essential-workers/list-essential-workers.component';
import { ViewEssentialWorkerComponent } from './view-essential-worker/view-essential-worker.component';
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

@NgModule({
  declarations: [
    ListEssentialWorkersComponent,
    CreateEssentialWorkersComponent,
    ViewEssentialWorkerComponent
],
  imports: [
    CommonModule,
    CitizenFinesRoutingModule,
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
export class CitizenFinesModule { }

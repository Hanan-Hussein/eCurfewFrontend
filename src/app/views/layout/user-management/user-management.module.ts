import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UserManagementRoutingModule} from './user-management-routing.module';
import {ListusersComponent} from './users/listusers/listusers.component';
import {EditDialogComponent} from './users/createuser/edit-dialog/edit-dialog.component';
import {ViewUserComponent} from './users/view-user/view-user.component';
import {ViewRoleComponent} from './roles/view-role/view-role.component';
import {CreateuserComponent} from './users/createuser/createuser.component';
import {CreateRoleComponent} from './roles/create-role/create-role.component';
import {RolesComponent} from './roles/roles.component';
import {WorkgroupsComponent} from './workgroups/workgroups.component';
import {CreateWorkgroupComponent} from './workgroups/create-workgroup/create-workgroup.component';
import {ViewWorkgroupComponent} from './workgroups/view-workgroup/view-workgroup.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatInputModule} from '@angular/material/input';
import {MatExpansionModule} from '@angular/material/expansion';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatTableModule} from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatCardModule} from '@angular/material/card';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTabsModule} from '@angular/material/tabs';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatStepperModule} from '@angular/material/stepper';
import {MatRadioModule} from '@angular/material/radio';
import {DataTablesModule} from 'angular-datatables';
import {MatDialogModule} from '@angular/material/dialog';
import {MatNativeDateModule} from '@angular/material/core';
import {UtilModule} from '../util/util.module';
import {CdkTableModule} from '@angular/cdk/table';
import {DeleteDialogComponent} from '../util/functionality-buttons/delete-dialog/delete-dialog.component';
import {DeclineDialogComponent} from '../util/functionality-buttons/decline-dialog/decline-dialog.component';
import {ApproveDialogComponent} from '../util/functionality-buttons/approve-dialog/approve-dialog.component';
import {FormWizardModule} from 'angular2-wizard/dist';
import {ExpandMode, NgxTreeSelectModule} from 'ngx-tree-select';
import {PageHeaderModule} from '../../../shared/modules/page-header/page-header.module';
import {UfsExportService} from '../util/ufs-export.service';
import {ApproveRolesComponent} from './roles/approve-roles/approve-roles.component';
import {ApproveWorkgroupsComponent} from './workgroups/approve-workgroups/approve-workgroups.component';
import {ApproveUsersComponent} from './users/approve-users/approve-users.component';
import {UserProfileComponent} from './user-profile/user-profile.component';


@NgModule({
  declarations: [

    ListusersComponent,
    EditDialogComponent,
    CreateuserComponent,
    ViewUserComponent,
    RolesComponent,
    CreateRoleComponent,
    ViewRoleComponent,
    WorkgroupsComponent,
    CreateWorkgroupComponent,
    ViewWorkgroupComponent,
    ApproveRolesComponent,
    ApproveWorkgroupsComponent,
    ApproveUsersComponent,
    UserProfileComponent
  ],
  imports: [
    CommonModule,
    UserManagementRoutingModule,
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
    PageHeaderModule
  ],

  entryComponents: [
    DeleteDialogComponent,
    ApproveDialogComponent,
    DeclineDialogComponent
  ],
  providers: [UfsExportService]
})
export class UserManagementModule {
}

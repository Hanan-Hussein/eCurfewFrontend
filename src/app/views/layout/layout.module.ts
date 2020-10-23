import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LayoutRoutingModule} from './layout-routing.module';
import {UtilModule} from './util/util.module';
import { MatNativeDateModule } from '@angular/material/core';
import { UserManagementModule } from './user-management/user-management.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    UtilModule,
    UserManagementModule,
    MatNativeDateModule
  ]
})
export class LayoutModule {
}

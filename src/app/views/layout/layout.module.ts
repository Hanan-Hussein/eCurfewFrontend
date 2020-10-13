import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LayoutRoutingModule} from './layout-routing.module';
import {UtilModule} from './util/util.module';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    UtilModule,
    MatNativeDateModule
  ]
})
export class LayoutModule {
}

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SetupRoutingModule} from './setup-routing.module';
import {SetupComponent} from './setup.component';
import {FormsModule} from '@angular/forms';
import {Notify} from '../shared/class/notify';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [SetupComponent],
  imports: [
    CommonModule,
    SetupRoutingModule,
    FormsModule,
    MatButtonModule
  ],
  providers: [Notify]
})
export class SetupModule {
}

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginRoutingModule} from './login-routing.module';
import {LoginComponent} from './login.component';
import {FormsModule} from '@angular/forms';
import {Notify} from '../shared/class/notify';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    FormsModule,
    MatButtonModule
  ],
  providers: [Notify]
})
export class LoginModule {
}

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {VerifyOtpRoutingModule} from './verify-otp-routing.module';
import {VerifyotpComponent} from './verifyotp.component';
import {FormsModule} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {Notify} from '../shared/class/notify';

@NgModule({
  declarations: [VerifyotpComponent],
  imports: [
    CommonModule,
    VerifyOtpRoutingModule,
    FormsModule,
    MatButtonModule
  ],
  providers: [Notify]
})
export class VerifyOtpModule {
}

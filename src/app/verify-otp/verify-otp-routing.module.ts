import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {VerifyotpComponent} from './verifyotp.component';


const routes: Routes = [
  {
    path: '',
    component: VerifyotpComponent,
    data: {title: 'Verify Otp'}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VerifyOtpRoutingModule {
}

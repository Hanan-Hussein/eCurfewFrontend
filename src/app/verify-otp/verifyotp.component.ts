import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Notify } from '../shared/class/notify';
import { StewardService } from '../shared/services/steward/steward.service';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { HttpHeaders } from '@angular/common/http';
import { routerTransition } from '../router.animations';
import { Otp } from '../entities/login';

@Component({
  selector: 'app-verifyotp',
  templateUrl: './verifyotp.component.html',
  styleUrls: ['./verifyotp.component.css'],
  animations: [routerTransition()],
})
export class VerifyotpComponent implements OnInit {
  model: any = {};
  isFailed = false;
  message: string;
  token: string;
  username: string;
  user: string;
  otps: Otp;

  constructor(
    public router: Router,
    public notify: Notify,
    private stewardService: StewardService<any, any>,
    protected localStorage: LocalStorage,
    private route: ActivatedRoute
  ) {
    this.otps = new Otp();
  }

  ngOnInit() {
    if (history.state.data !== undefined) {
      this.token = history.state.data.token;
    }
    const pasteBox = document.getElementById('no-paste');
    pasteBox.onpaste = (e) => {
      e.preventDefault();
      return false;
    };
  }

  onVerify(otpForm: NgForm) {
    const corId = localStorage.getItem('correlationId');
    this.otps.correlationId = corId;
    this.stewardService
      .sendToken('fortis/rest/v2/oauth/verify-token', this.otps)
      .subscribe(
        (response) => {
          if (response.code === 401) {
            this.notify.showWarning(response.message);
          } else if (response.code === 400) {
            this.notify.showWarning(response.message);
          } else {
            if (response.access_token !== null) {

              localStorage.setItem('access_token', response.access_token);
              localStorage.setItem('isLoggedin', 'true');
              this.router.navigate(['/home/customers/customers']);
              this.notify.showSuccess('Authentication was successful');
            } else {
              this.notify.showWarning(response.message);
            }
          }
        },
        (error) => {
          otpForm.resetForm();

          this.isFailed = true;
          this.message = error.error.message;
          this.notify.showWarning(this.message);
        }
      );
  }

  resendOtp() {
    this.stewardService.get('otp/resend').subscribe(
      (response) => {
        this.notify.showSuccess(response.message);
      },
      (error) => {
        this.isFailed = true;
        this.message = error.error.message;
        this.notify.showWarning(this.message);
      }
    );
  }
}

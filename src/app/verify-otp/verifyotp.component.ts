import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Notify} from '../shared/class/notify';
import {StewardService} from '../shared/services/steward/steward.service';
import {LocalStorage} from '@ngx-pwa/local-storage';
import {HttpHeaders} from '@angular/common/http';
import {routerTransition} from '../router.animations';

@Component({
  selector: 'app-verifyotp',
  templateUrl: './verifyotp.component.html',
  styleUrls: ['./verifyotp.component.css'],
  animations: [routerTransition()]
})
export class VerifyotpComponent implements OnInit {

  model: any = {};
  isFailed = false;
  message: string;
  token: string;
  username: string;
  user: string;

  constructor(
    public router: Router,
    public notify: Notify,
    private stewardService: StewardService<any, any>,
    protected localStorage: LocalStorage,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    if (history.state.data !== undefined) {
      this.token = history.state.data.token;
    }
    const pasteBox = document.getElementById('no-paste');
    pasteBox.onpaste = e => {
      e.preventDefault();
      return false;
    };
  }

  onVerify(otpForm: NgForm) {
    let headers: HttpHeaders;
    const params = new URLSearchParams();
    params.append('otp', this.model.otp);
    if (this.token !== undefined) {
      headers = new HttpHeaders({
        'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
        'Authorization': 'Bearer ' + this.token
      });
    }
    this.stewardService.postFormAuthorized('otp/verification', params.toString(), headers).subscribe(response => {
        if (response.code === 200) {
          // if (response.data.userType === 'Society Union'){
          //   this.notify.showWarning('Sorry You Are Not Allowed To Login To Posta Portal');
          //   this.router.navigate(['login'] );
          //   return;
          // }else{
          localStorage.setItem('username', response.data.userDetails.fullName);
          localStorage.setItem('isLoggedin', 'true');
          localStorage.setItem('userData', JSON.stringify(response));
          localStorage.setItem('userType', response.data.userType);
          this.localStorage.setItem('username', response.data.userDetails.fullName).subscribe(() => {
          });
          this.localStorage.setItem('isLoggedin', true).subscribe(() => {
          });
          this.localStorage.setItem('userData', response).subscribe(() => {
          });
          localStorage.setItem('userId', JSON.stringify(response.data.userDetails.userId));
          localStorage.setItem('tenantId', JSON.stringify(response.data.tenantIds));
          // tslint:disable-next-line:triple-equals
          this.router.navigate(['home/dashboard/dashboard'], {
            state: {
              data: {
                'token': localStorage.getItem('access_token')
              }
            }
          });
          // }
          this.notify.showSuccess(`Welcome: ${response.data.userDetails.fullName} `);
        } else {
          this.notify.showWarning(response.message);
        }
      },
      error => {
        otpForm.resetForm();
       
        this.isFailed = true;
        this.message = error.error.message;
        this.notify.showWarning(this.message);
      });
   
  }

  resendOtp() {
    this.stewardService.get('otp/resend').subscribe(response => {
        this.notify.showSuccess(response.message);
      },
      error => {
       
        this.isFailed = true;
        this.message = error.error.message;
        this.notify.showWarning(this.message);
      });
  }
}

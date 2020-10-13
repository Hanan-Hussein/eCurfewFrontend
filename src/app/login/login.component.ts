import {Component, OnInit, Inject} from '@angular/core';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {Notify} from '../shared/class/notify';
import {MyErrorStateMatcher} from '../shared/class/error-state-handler';
import {StewardService} from '../shared/services/steward/steward.service';
import { DOCUMENT } from '@angular/common'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  model: any = {};
  isFailed = false;
  message: string;
  matcher = new MyErrorStateMatcher();
  users = [];
  loadtext ='';

  constructor(
    public router: Router,
    public notify: Notify,
    private stewardService: StewardService<any, any>,
    @Inject(DOCUMENT) document
  ) {
  }

  ngOnInit() {
    console.log("this is a test for java and javascript");
   
    
    const inst = this;
    // this.stewardService.getNoToken('common-modules/api/v1/initial-setup').subscribe((response) => {
    //   if (response.code === 200) {
    //     inst.users = response.data.content;
    //     if (inst.users.length < 1) {
    //       this.router.navigate(['/setup']);
    //     }
    //   } else {
    //     inst.notify.showWarning(response.message);
    //   }
    // });
  }

  onLoggedin(form: NgForm) {
    const params = new URLSearchParams();
    params.append('username', this.model.email);
    params.append('password', this.model.password);
    params.append('grant_type', 'password'); // oauth/token // process-login

    this.stewardService.postLogin('oauth/token', params.toString()).subscribe((response) => {
   
        if (response.code === 400) {
          this.notify.showWarning(response.message);
        } else if (response.code === 410) {
          this.router.navigate(['/change-password']);
        } else if (response.code === 200) {
          this.router.navigate(['verify_otp']);
        } else {
          if (response.access_token.length !== 0) {
            localStorage.setItem('access_token', response.access_token);
            this.router.navigate(['verify_otp'], {state: {data: {'token': response.access_token}}}).then(r => location.reload());
            // this.router.navigate(['/verify-otp'], {state: {data: {'token': response.access_token}}}).then(r => location.reload());
          } else {
            this.notify.showWarning(response.message);
          }
          // this.notify.showWarning(response.message);
        }
      },
      error => {
        if (error.error.message === 'Sorry password has expired') {
          this.router.navigate(['/change-password']);
        } else {
          this.isFailed = true;
          this.message = error.error.message;
          this.notify.show(this.message);
        }
      });
  }

}

import {Component, OnInit, Inject} from '@angular/core';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {Notify} from '../shared/class/notify';
import {MyErrorStateMatcher} from '../shared/class/error-state-handler';
import {StewardService} from '../shared/services/steward/steward.service';
import { DOCUMENT } from '@angular/common';
import { Login } from './../entities/login';

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
  loadtext = '';
  isLoggedIn = true;
  login: Login;

  constructor(
    public router: Router,
    public notify: Notify,
    private stewardService: StewardService<any, any>,
    @Inject(DOCUMENT) document
  ) {
    this.login = new Login();
  }

  ngOnInit() {
    console.log('this is a test for java and javascript');
    const inst = this;
    window.localStorage.clear();
  }

  onLoggedin(form: NgForm) {
    const params = new URLSearchParams();
    params.append('username', this.model.email);
    params.append('password', this.model.password);
    // params.append('grant_type', 'password'); // oauth/token // process-login

    this.stewardService.sendToken('app/rest/v2/oauth/send-token', this.login).subscribe((response: any) => {

      if (response.code === 400) {
        this.notify.showWarning(response.message);
      } else if (response.code === 401){
        this.notify.showWarning(response.message);
      }else if (response.code === 410){
        this.router.navigate(['first-change']);
      } else {
        if (response.correlationId.length !== 0) {
          localStorage.setItem('correlationId', response.correlationId);
          // localStorage.setItem('isLoggedin', 'true');
          localStorage.setItem('username', this.login.username);
          // this.router.navigate(['home/dashboard/dashboard']);
          this.router.navigate(['verify_otp']);
        }
      }

    },
      error => {
        this.message = error.error.message;
        this.notify.show(this.message);

      });
  }

}

import { Component, OnInit, Inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MyErrorStateMatcher } from '../shared/class/error-state-handler';
import { Notify } from '../shared/class/notify';
import { StewardService } from '../shared/services/steward/steward.service';
import { DOCUMENT } from '@angular/common';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-biometrics',
  templateUrl: './biometrics.component.html',
  styleUrls: ['./biometrics.component.css']
})
export class BiometricsComponent implements OnInit {
  model: any = {};
  isFailed = false;
  message: string;
  matcher = new MyErrorStateMatcher();
  users = [];
  loadtext ='';
  fingerprint:any;
  imageSource;
  scanned=false;


  constructor(
    public router: Router,
    private sanitizer:DomSanitizer,
    public notify: Notify,
    private stewardService: StewardService<any, any>,
    @Inject(DOCUMENT) document
  ) { }

  ngOnInit(): void {
    const inst = this;
  }

  scanFingerPrint(){
    const fpRsponse:string=(<any>window).fortis.getFingerPrint();
    this.fingerprint =JSON.parse(fpRsponse);
    this.scanned=true;
    this.imageSource =this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/bmp;base64,${this.fingerprint.payload}`);

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

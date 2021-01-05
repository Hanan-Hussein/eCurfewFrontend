import { Component, OnInit, Inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MyErrorStateMatcher } from '../shared/class/error-state-handler';
import { Notify } from '../shared/class/notify';
import { StewardService } from '../shared/services/steward/steward.service';
import { DOCUMENT } from '@angular/common';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Biometrics } from './../entities/login';

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
  biometrics:Biometrics;
  base64FingerPrint:any;


  constructor(
    public router: Router,
    private sanitizer:DomSanitizer,
    public notify: Notify,
    private stewardService: StewardService<any, any>,
    @Inject(DOCUMENT) document
  ) {
    this.biometrics = new Biometrics();
   }

  ngOnInit(): void {
    const inst = this;
  }

  scanFingerPrint(){
    this.stewardService.getFingerPrint('http://localhost:8080/launchmso').subscribe((response) => {
      if (response.payload) {
        this.base64FingerPrint = response.payload;
        this.scanned=true;
        this.imageSource =this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/bmp;base64,${response.payload}`);
        
        this.notify.showSuccess("Finger print scanned");
        
      } else {
        this.notify.showWarning("Make sure the Desktop FingerPrint Scanner is Running");
      }
    },
     error => {
      this.notify.showWarning("no server");
    });
  }

  onLoggedin(form: NgForm) {
    const params = new URLSearchParams();
    params.append('username', this.model.email);
    params.append('fingerPrint', this.base64FingerPrint);

    this.stewardService.sendToken('fortis/rest/v2/oauth/verify-print', {'username':this.model.email,'fingerPrint':this.base64FingerPrint}).subscribe((response: any) => {
      console.log(">>>>>>>>>>>>>>>>>>>>>response",response.access_token);
      if (response.code === 0) {
        this.notify.showWarning("Network Error, check Newtork Connection")
      }
      
        if (response.code === 400) {
          this.notify.showWarning(response.message);
        } else if (response.code === 401){
          this.notify.showWarning(response.message);
        } else {
          
        }
        if (response.access_token) {
            localStorage.setItem('access_token', response.access_token);
            localStorage.setItem('isLoggedin', 'true');
            localStorage.setItem('username', this.model.email);
            this.router.navigate(['home/dashboard/dashboard']);
            this.notify.showSuccess('Authentication was successful');
          } else {
            this.notify.showWarning("Bad Finger Print Image or Check internet connection to server");
        }
      },
      error => {
        this.message = "Unauthorized, Place the correct finger correctly for a better Quality";
        this.notify.showWarning(this.message);
      });
  }

}

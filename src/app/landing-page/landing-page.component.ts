import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  constructor(public router: Router,) { }
  

  ngOnInit(): void {
  }

  onLoginClick(){
    this.router.navigate(['login']);
  };
  onBiometrics(){
    this.router.navigate(['biometrics']);
  };

}

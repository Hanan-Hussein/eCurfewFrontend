import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {routerTransition} from '../router.animations';
import {NgForm} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import {StewardService} from '../shared/services/steward/steward.service';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
  animations: [routerTransition()]
})
export class ForgotPasswordComponent implements OnInit {
  model: any = {};

  isFailed = false;
  message: string;
  currentYear = new Date().getFullYear();

  constructor(public router: Router, public snackBar: MatSnackBar, private stewardService: StewardService<any, any>) {
  }

  ngOnInit() {
  }

  resetPass(form: NgForm) {

    // const params = new URLSearchParams();
    // params.append('username', this.model.username);
    this.stewardService.postNoToken('fortis/rest/forgot/password',this.model ).subscribe(response => {
        if (response.code === 200) {

          this.snackBar.open(response.message, 'Notification', {
            duration: 5000,
            panelClass: 'snackbar-success',
            horizontalPosition: 'right'
          });
          this.router.navigate(['/login']);
        } else {
          // return false to indicate failed login
          this.snackBar.open(response.message, 'Notification', {
            duration: 5000,
            panelClass: 'snackbar-success',
            horizontalPosition: 'right'
          });
        }
      },
      error => {
        form.resetForm();
        this.isFailed = true;
        this.message = error.error.message;
        this.snackBar.open(error.error.message, 'Notification', {
          duration: 5000,
          panelClass: 'snackbar-success',
          horizontalPosition: 'right'
        });
      });
  }

}

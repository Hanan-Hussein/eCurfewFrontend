import {Component, OnInit} from '@angular/core';
import {routerTransition} from '../router.animations';
import {ChangepassWrapper} from '../entities/wrappers/change-pass-wrapper';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import {StewardService} from '../shared/services/steward/steward.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
  animations: [routerTransition()]
})
export class ChangePasswordComponent implements OnInit {
  model: ChangepassWrapper;
  isFailed = false;
  message: string;
  currentYear = new Date().getFullYear();
  public form: FormGroup;
  confirmPassword: string;

  constructor(private router: Router, public snackBar: MatSnackBar, private stewardService: StewardService<any, any>, private formBuilder: FormBuilder) {
    this.model = new ChangepassWrapper();
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      'email': ['', Validators.compose([Validators.required])],
      'oldPassword': ['', Validators.compose([Validators.required])],
      'newPassword': ['', Validators.compose([Validators.required])],
      'confirmPassword': ['', Validators.compose([Validators.required])],
    }, {validator: matchingPasswords('confirmPassword', 'newPassword')});
  }

  changePass() {

    this.stewardService.postNoToken('change-password/first-time', this.model).subscribe(response => {
      if (response.code === 200) {
        this.router.navigate(['/login']);
      } else {
        this.snackBar.open(response.message, 'Notification', {
          duration: 5000,
          panelClass: 'snackbar-success',
          horizontalPosition: 'right'
        });
      }
    }, error => {
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

export function matchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
  return (group: FormGroup) => {
    const password = group.controls[passwordKey];
    const passwordConfirmation = group.controls[passwordConfirmationKey];
    if (password.value !== passwordConfirmation.value) {
      return passwordConfirmation.setErrors({mismatchedPasswords: true});
    }
  };
}

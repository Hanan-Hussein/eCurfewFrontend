import { Component, OnInit, Output } from '@angular/core';
import {routerTransition}from '../../../../../router.animations';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Notify } from '../../../../../shared/class/notify';
import { StewardService } from '../../../../../shared/services/steward/steward.service';
import { EditDialogComponent } from '../../users/createuser/edit-dialog/edit-dialog.component';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { CheckerActions } from '../../../../../entities/wrappers/checker-actions';
import { CreateUserWrapper } from '../../../../../entities/wrappers/create-user-wrapper';
import { MatDialog } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  animations: [routerTransition()]
})
export class ProfileComponent implements OnInit {
  model: CreateUserWrapper;
  isReadOnly = true;
  disabled = true;
  modal: NgbModalRef;
  checkerActions: CheckerActions;
  isUpdate: boolean;
  formGroup: FormGroup;
  subscription: Subscription;
  lockLabel = 'Lock';
  unlockLabel = 'Unlock';
  activateLabel = 'Activate';
  deactivateLabel = 'Deactivate';
  resetLabel = 'Reset Password';
  form: FormGroup;
  @Output() id: string;

  constructor(public dialog: MatDialog,private stewardService: StewardService<any, any>, private notify: Notify,
    protected router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder) {
      this.subscription = new Subscription;
      this.model = new CreateUserWrapper();
      this.checkerActions = new CheckerActions();
      this.checkerActions.action = 'approve';
    }

  ngOnInit() {
    const params: Map<any, string> = new Map();
    const inst = this;

    this.formGroup = new FormGroup({
      action: new FormControl()
    });
    this.fetchUser();
  }
  @HostListener('window:beforeunload')
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  fetchUser() {
    const params: Map<any, string> = new Map();
    const inst = this;

      this.stewardService.get('fortis/rest/v2/userInfo').subscribe((response) => {
        if (response) {
          // console.log(">>>>>>>>",response.id);
          // console.log(">>>>>",response.email);
          // console.log(">>>>>",response.firstName);
          // console.log(">>>>>",response.lastName);

          this.model.email=response.email;
          this.model.firstName=response.firstName;
          this.model.lastName=response.lastName;
          // this.model.phoneNumber=response.phoneNumber;
          this.id = response.id;
        } else {
          inst.notify.showWarning(response.message);
        }
      })

  }
  enableUpdate() {
    this.isReadOnly = false;
    this.isUpdate = !this.isUpdate;
  }

  disableUpdate() {
    this.isReadOnly = true;
    this.isUpdate = !this.isUpdate;
  }

  onUpdate(form: NgForm) {

    const inst = this;

    const params: Map<any, string> = new Map();

        this.stewardService.put('fortis/rest/v2/entities/fortis_FortisUser/'+this.id ,this.model).subscribe((response) => {
          if (response) {
            // console.log("user>>>>>>>>>>>>>>>",response.id);
            response.message="For an update to reflect user has to log in again";
            inst.notify.showSuccess(response.message);
            // form.resetForm();
            this.router.navigate(['home/user-management/profile']);
          } else {
            inst.notify.showWarning(response.message);
          }
        }, error => {
          inst.notify.showWarning(error.error.message);
        });
    }
  // }

  approve(form: NgForm) {
    const ids: Array<any> = [];
    ids.push(this.model.userId);

    this.checkerActions.ids = ids;
    if (this.checkerActions.notes == null) {
      this.checkerActions.notes = '';
    }
     else {
      this.stewardService.put('user/' + this.checkerActions.action.toLowerCase(), this.checkerActions).subscribe((response) => {
        console.log(response);
        if (response.code === 200) {
          this.modal.close();
          this.notify.showSuccess(response.message);
          $($.fn.dataTable.tables(true)).DataTable().ajax.reload(null, false);
          form.resetForm();
        } else {
          this.notify.showWarning(response.message);
        }
      });
    }
  }

  open(content: any, action: string) {
    this.checkerActions.action = action;
    const dialogRef = this.dialog.open(EditDialogComponent, {
      width: '500px',
      data: {
        checkerActions: this.checkerActions,
        lockLabel: this.lockLabel,
        unlockLabel: this.unlockLabel,
        activateLabel: this.activateLabel,
        deactivateLabel: this.deactivateLabel,
        resetLabel: this.resetLabel,
        model: this.model,
        formGroup: this.formGroup
      }
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

}

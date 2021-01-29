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
import {Roles} from '../../../../../entities/roles-modules'

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
  roles: Roles[];
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
  workgroupid:string;
  wG=[];
  workGroupResId=[];
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
    this.stewardService.get('fortis/rest/v2/entities/fortis_WorkGroups/search?filter=%7B%22conditions%22%3A%20%5B%7B%22property%22%3A%20%22actionStatus%22%2C%22operator%22%3A%20%22%3D%22%2C%22value%22%3A%20%22APPROVED%22%20%7D%5D%7D&returnCount=true', params).subscribe((response:any) => {
      if (response) {
        response.forEach(response => {
                  // console.log(">>>>>>>>>>>",response);
          // console.log("response id",response.id);
                  inst.workgroupid=response.id;

        });
        inst.roles = response;
        //console.log("roles",this.roles)
        this.fetchUser();

      } else {
        inst.notify.showWarning(response.message);
      }
    });
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

      this.stewardService.get('fortis/rest/v2/services/fortis_UserInfoService/UserInfo').subscribe((response) => {
        if (response) {
          // console.log(">>>>>>>>",response.id);
          // console.log(">>>>>",response.email);
          // console.log(">>>>>",response.firstName);
          // console.log(">>>>>",response.lastName);
          // console.log("user info id",response.id);
          // console.log("work group id",this.workgroupid);
          this.wG=response.workGroups;
          // console.log("wG",this.wG);
          this.model.email=response.email;
          this.model.firstName=response.firstName;
          this.model.lastName=response.lastName;
          this.model.phoneNumber=response.phoneNumber;
         // console.log("<<<<<<<<<< roles",this.roles);

          this.roles.forEach(role=>{
            this.wG.forEach(wG => {
              // this.workGroupResId=wG.id;
             // console.log("res work group id",wG.id);
             // console.log("workGroup Id",this.workgroupid);
                if(wG.id === role.id){
                  role.checked=true;
                }

            });
          });
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

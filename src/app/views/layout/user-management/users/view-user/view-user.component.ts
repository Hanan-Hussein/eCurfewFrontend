import {Component, HostListener, OnDestroy, OnInit, Output} from '@angular/core';
import {CreateUserWrapper} from '../../../../../entities/wrappers/create-user-wrapper';
import {PasswordReset} from '../../../../../entities/wrappers/reset-password-wrapper';
import {Roles} from '../../../../../entities/roles-modules';
import {FormControl, FormGroup, NgForm} from '@angular/forms';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {CheckerActions} from '../../../../../entities/wrappers/checker-actions';
import {Subscription} from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import {StewardService} from '../../../../../shared/services/steward/steward.service';
import {Notify} from '../../../../../shared/class/notify';
import {ActivatedRoute, Router} from '@angular/router';
import {EditDialogComponent} from '../createuser/edit-dialog/edit-dialog.component';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.scss']
})
export class ViewUserComponent implements OnInit, OnDestroy {
  model: CreateUserWrapper;
  reset: PasswordReset;
  systemRoles: Roles[];
  workgroups: number[] = [];
  firstName: string;
  lastName: string;
  formGroup: FormGroup;
  modal: NgbModalRef;
  checkerActions: CheckerActions;
  lockLabel = 'Lock';
  unlockLabel = 'Unlock';
  activateLabel = 'Activate';
  deactivateLabel = 'Deactivate';
  resetLabel = 'Reset Password';
  gender = [];
  userType = [];
  isReadOnly = true;
  disabled = true;
  isUpdate: boolean;
  workgroupid:string;
  workGroup=[];
  form: FormGroup;
  @Output() id: string;
  subscription: Subscription;
  responseData={};
  checkedRoles: any [] = [];
  arraryofCheckedroles=[];



  constructor(public dialog: MatDialog, private stewardService: StewardService<any, any>, private notify: Notify,
              private route: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {
    this.model = new CreateUserWrapper();
    this.checkerActions = new CheckerActions();
    this.checkerActions.action = 'approve';
    this.reset = new PasswordReset();
    this.subscription = new Subscription();
  }

  ngOnInit() {
    const params: Map<any, string> = new Map();
    const inst = this;
    // this.stewardService.get('workgroup', params).subscribe((response) => {
    //   if (response.code === 200) {
    //     inst.systemRoles = response.data.content;
    //   } else {
    //     inst.notify.showWarning(response.message);
    //   }
    // });
    this.stewardService.get('fortis/rest/v2/entities/fortis_WorkGroups/search?filter=%7B%22conditions%22%3A%20%5B%7B%22property%22%3A%20%22actionStatus%22%2C%22operator%22%3A%20%22%3D%22%2C%22value%22%3A%20%22APPROVED%22%20%7D%5D%7D&returnCount=true', params).subscribe((response:any) => {
      if (response) {
        response.forEach(response => {
                  // console.log(">>>>>>>>>>>",response);
          // console.log("response id",response.id);
                  inst.workgroupid=response.id;

        });
        inst.systemRoles = response;

      } else {
        inst.notify.showWarning(response.message);
      }
    });

    this.route.params.subscribe(params => {
      if (params['id'] != null) {
        this.fetchUser(params['id']);
      }
    });

    this.formGroup = new FormGroup({
      action: new FormControl()
    });
  }

  @HostListener('window:beforeunload')
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  fetchUser(id: number) {
    const params: Map<any, string> = new Map();
        params.set('view', 'workgroup-view');
    const inst = this;
    inst.subscription.add(
      this.stewardService.get('fortis/rest/v2/entities/fortis_FortisUser/' + id, params).subscribe((response) => {
        if (response) {
          console.log("response",response);
          console.log("response id",response.id);
          console.log("response email",response.email);
        //  console.log("response workGroup",response.workGroups);
          this.workGroup=response.workGroups;
          // console.log(",,,,",this.workGroup);
          this.systemRoles.forEach(roles=>{
            this.workGroup.forEach(resp => {
              if(roles.id===resp.id){
                roles.checked=true;
              }
              // console.log(",,,",resp.name);

            });

          });


          this.model.email=response.email;
          this.model.firstName=response.firstName;
          this.model.lastName=response.lastName;
          this.model.phoneNumber=response.phoneNumber;
          this.model.nationalId=response.nationalId;
          this.model.position=response.position;


          // console.log(this.responseData);

          // const x = response.data.fullName.split(' ');
          // inst.firstName = x[0];
          // inst.lastName = x[1];
          this.id = response.id;
          // console.log(inst.model.userTypeId, 'user type');
        } else {
          inst.notify.showWarning(response.message);
        }
      })
    );
    // inst.subscription.add(
    //   this.stewardService.get('workgroups/' + id, params).subscribe((response) => {
    //     // console.log(response);
    //     if (response.code === 200) {
    //       const data = response.data;
    //       // console.log('Data:', data);
    //       data.forEach(workgroup => {
    //         this.systemRoles.map(mp => {
    //           if (mp.groupId === workgroup.groupId) {
    //             mp.checked = true;
    //           }
    //         });

    //       });

    //     } else {
    //       inst.notify.showWarning(response.message);
    //     }
    //   })
    // );

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
    this.systemRoles.forEach(res => {
      if (res.checked) {
        this.checkedRoles.push(res.id);
      }
    });
    for (let index = 0; index < this.checkedRoles.length; index++) {
      const element = this.checkedRoles[index];

      this.arraryofCheckedroles.push({
        "id":element

      })

    }
    console.log("array",this.arraryofCheckedroles);

        this.model.workGroups = this.arraryofCheckedroles;
    //this.model.workGroups = this.checkedRoles;

   // this.model.workgroup_id = this.workgroups;
   // this.model.fullName = this.firstName + ' ' + this.lastName;
    const inst = this;

    const params: Map<any, string> = new Map();

        this.stewardService.put('fortis/rest/v2/update/user/'+this.id ,this.model).subscribe((response) => {
          if (response) {
            inst.notify.showSuccess(response.message);
            form.resetForm();
            this.router.navigate(['home/user-management/users']);
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
    if (this.checkerActions.action === 'Reset Password') {
      this.reset.email = this.model.email;
      this.stewardService.postFormData('users/forgot-password', this.reset).subscribe((response) => {
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
    } else {
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

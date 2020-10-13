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
  form: FormGroup;
  @Output() id: string;
  subscription: Subscription;

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
    params.set('actionStatus', 'Approved');
    this.stewardService.get('workgroup', params).subscribe((response) => {
      if (response.code === 200) {
        inst.systemRoles = response.data.content;
      } else {
        inst.notify.showWarning(response.message);
      }
    });
    this.stewardService.get('gender').subscribe((response) => {
      if (response.code === 200) {
        inst.gender = response.data.content;
      } else {
        inst.notify.showWarning(response.message);
      }
    });

    this.stewardService.get('user-types').subscribe((response) => {
      if (response.code === 200) {
        inst.userType = response.data.content;
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
    const inst = this;
    inst.subscription.add(
      this.stewardService.get('user/' + id, params).subscribe((response) => {
        if (response.code === 200) {
          // console.log(response);
          inst.model = response.data;
          const x = response.data.fullName.split(' ');
          inst.firstName = x[0];
          inst.lastName = x[1];
          this.id = response.data.userId;
          // console.log(inst.model.userTypeId, 'user type');
        } else {
          inst.notify.showWarning(response.message);
        }
      })
    );
    inst.subscription.add(
      this.stewardService.get('workgroups/' + id, params).subscribe((response) => {
        // console.log(response);
        if (response.code === 200) {
          const data = response.data;
          // console.log('Data:', data);
          data.forEach(workgroup => {
            this.systemRoles.map(mp => {
              if (mp.groupId === workgroup.groupId) {
                mp.checked = true;
              }
            });

          });

        } else {
          inst.notify.showWarning(response.message);
        }
      })
    );

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
        this.workgroups.push(res.groupId);
      }
    });
    this.model.workgroupIds = this.workgroups;
    this.model.fullName = this.firstName + ' ' + this.lastName;
    const inst = this;


    if (this.model.workgroupIds.length < 1) {
      inst.notify.showWarning('You have not selected any workgroups yet');
    } else {
      this.model.tenantIds = JSON.parse(localStorage.getItem('tenantId'));
        const currentUserId = JSON.parse(localStorage.getItem('userId'));

        if (currentUserId === this.model.userId) {
          this.notify.showWarning('Unable to update current logged in user');
          return;
        }
        this.model.tenantIds = JSON.parse(localStorage.getItem('tenantId'));

        this.stewardService.put('user', this.model).subscribe((response) => {
          if (response.code === 200) {
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
  }

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

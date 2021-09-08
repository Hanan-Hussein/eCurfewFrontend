import {Component, HostListener, OnDestroy, OnInit, Output} from '@angular/core';
import { Category, CreateEssentialWorkerWrapper } from '../../../../entities/wrappers/create-essential-worker-wrapper';
import { PasswordReset } from '../../../../entities/wrappers/reset-password-wrapper';
import {Roles} from '../../../../entities/roles-modules';
import {FormControl, FormGroup, NgForm} from '@angular/forms';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import { CheckerActions } from '../../../../entities/wrappers/checker-actions';
import {Subscription} from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { StewardService } from '../../../../shared/services/steward/steward.service';
import {Notify} from '../../../../shared/class/notify';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-view-essential-worker',
  templateUrl: './view-essential-worker.component.html',
  styleUrls: ['./view-essential-worker.component.scss']
})
export class ViewEssentialWorkerComponent implements OnInit {
  model: CreateEssentialWorkerWrapper;
  categories: any;
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
  workgroupid: string;
  workGroup = [];
  form: FormGroup;
  @Output() id: string;
  subscription: Subscription;
  responseData = {};
  checkedRoles: any [] = [];
  arraryofCheckedroles = [];



  constructor(public dialog: MatDialog, private stewardService: StewardService<any, any>, private notify: Notify,
              private route: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {
    this.model = new CreateEssentialWorkerWrapper();
    this.checkerActions = new CheckerActions();
    this.checkerActions.action = 'approve';
    this.reset = new PasswordReset();
    this.subscription = new Subscription();
  }

  ngOnInit() {
    const inst = this;
    this.route.params.subscribe (params => {
      if (params['id'] != null) {
        this.fetchUser(params['id']);
      }
    });

    this.formGroup = new FormGroup({
      action: new FormControl()
    });
    this.stewardService.get('app/rest/v2/entities/ecurfew_Category').subscribe((response) => {

      if (response) {
        this.categories = response;

    } else {
        this.notify.showWarning(response.message);
    }
  });
  }

  @HostListener('window:beforeunload')
  // tslint:disable-next-line: use-life-cycle-interface
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  fetchUser(id: number) {
    const params: Map<any, string> = new Map();
        params.set('view', 'essentialWorkers-view');
    const inst = this;
    inst.subscription.add(
      this.stewardService.get('app/rest/v2/entities/ecurfew_EssentialWorkers/' + id, params).subscribe((response) => {
        if (response) {
          this.model.category = new Category();
          console.log('response', response);
          console.log('response id', response.id);
          console.log('response email', response.email);
          console.log('response category', response.category.id);
          this.model.email = response.email;
          this.model.firstName = response.firstName;
          this.model.lastName = response.lastName;
          this.model.phoneNumber = response.phoneNumber;
          this.model.nationalId = response.nationalId;
          this.model.employeeNumber = response.employeeNumber;
          this.model.category.id = response.category.id;
          this.id = response.id;
          // console.log(inst.model.userTypeId, 'user type');
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
    const inst = this;

    // const params: Map<any, string> = new Map();

        this.stewardService.put('app/rest/v2/update/essential-worker/' + this.id , this.model).subscribe((response) => {
          if (response) {
            inst.notify.showSuccess(response.message);
            form.resetForm();
            this.router.navigate(['home/citizens/essential-workers']);
          } else {
            inst.notify.showWarning(response.message);
          }
        }, error => {
          inst.notify.showWarning(error.error.message);
        });
    }



}

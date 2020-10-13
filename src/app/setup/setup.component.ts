import {Component, HostListener, OnDestroy, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {Notify} from '../shared/class/notify';
import {StewardService} from '../shared/services/steward/steward.service';
import {CreateUserWrapper} from '../entities/wrappers/create-user-wrapper';
import {Roles} from '../entities/roles-modules';
import {Subscription} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.css']
})
export class SetupComponent implements OnInit, OnDestroy {
  model: CreateUserWrapper;
  systemRoles: Roles[];
  workgroups: number[] = [];
  firstName: string;
  lastName: string;
  public isUpdate = false;
  gender = [];
  userType = [];
  @Output() id: string;
  subscription: Subscription;

  constructor(public dialog: MatDialog, private stewardService: StewardService<any, any>, private notify: Notify,
              protected router: Router) {
    this.model = new CreateUserWrapper();
    this.subscription = new Subscription();
  }

  ngOnInit() {
    const params: Map<any, string> = new Map();
    const inst = this;
    params.set('actionStatus', 'Approved');
    this.stewardService.getNoToken('common-modules/api/v1/workgroup', params).subscribe((response) => {
      if (response.code === 200) {

        inst.systemRoles = response.data.content;
      } else {
        inst.notify.showWarning(response.message);
      }
    });
    this.stewardService.getNoToken('common-modules/api/v1/gender').subscribe((response) => {
      if (response.code === 200) {
        inst.gender = response.data.content;
      } else {
        inst.notify.showWarning(response.message);
      }
    });

    this.stewardService.getNoToken('common-modules/api/v1/user-types').subscribe((response) => {
      if (response.code === 200) {
        inst.userType = response.data.content;
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

  onSetupUser(form: NgForm) {
    this.systemRoles.forEach(res => {
      if (res.checked) {
        this.workgroups.push(res.groupId);
      }
    });
    this.model.workgroupIds = this.workgroups;
    this.model.fullName = this.firstName + ' ' + this.lastName;
    this.model.userTypeId = 0;
    const inst = this;
    if (this.model.workgroupIds.length < 1) {
      inst.notify.showWarning('You have not selected any workgroups yet');
    } else {
      this.model.tenantIds = JSON.parse(localStorage.getItem('tenantId'));

      this.stewardService.postNoToken('common-modules/api/v1/initial-setup', this.model).subscribe((response) => {
        if (response.code === 201) {
          inst.notify.showSuccess(response.message);
          this.router.navigate(['home/user-management/users']);
        } else {
          inst.notify.showWarning(response.message);
        }
      }, error => {
        
        inst.notify.showWarning(error.error.message);
      });
    }
  }

}

import { MatDialog } from '@angular/material/dialog';


import {CreateUserWrapper} from '../../../../../entities/wrappers/create-user-wrapper';
import {Roles} from '../../../../../entities/roles-modules';
import {StewardService} from '../../../../../shared/services/steward/steward.service';
import {Notify} from '../../../../../shared/class/notify';
import {routerTransition} from '../../../../../router.animations';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs';
import {Component, HostListener, OnDestroy, OnInit, Output} from '@angular/core';

// @ts-ignore
@Component({
  selector: 'app-createuser',
  templateUrl: './createuser.component.html',
  styleUrls: ['./createuser.component.scss'],
  animations: [routerTransition()]
})
export class CreateuserComponent implements OnInit, OnDestroy {
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

  }

  @HostListener('window:beforeunload')
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onCreateUser(form: NgForm) {
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
      this.stewardService.post('user', this.model).subscribe((response) => {
        console.log(response);
        if (response.code === 201) {
          inst.notify.showSuccess(response.message);
          this.router.navigate(['home/user-management/users']);
        } else {
          inst.notify.showWarning(response.message);
        }
      }, error => {
        console.log(error);
        inst.notify.showWarning(error.error.message);
      });
    }
  }

}

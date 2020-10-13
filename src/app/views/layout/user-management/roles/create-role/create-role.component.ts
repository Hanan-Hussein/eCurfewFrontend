import {Component, OnInit} from '@angular/core';
import {Entities} from './Entities';
import {PostRoles} from './PostRoles';
import {StewardService} from '../../../../../shared/services/steward/steward.service';
import {GlobalParams} from '../../../../../shared/services/globalparams';
import {Notify} from '../../../../../shared/class/notify';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-create-role',
  templateUrl: './create-role.component.html',
  styleUrls: ['./create-role.component.scss']
})
export class CreateRoleComponent implements OnInit {
  entities: Entities[];
  model: any = {};
  permissions: number[] = [];
  message: string;

  constructor(private stewardService: StewardService<any, any>,
              private globalParam: GlobalParams,
              private notify: Notify, private router: Router) {
  }

  ngOnInit() {
    const that = this;
    this.stewardService.get('entity').subscribe(resp => {
      that.entities = resp.data.content;
    });
  }

  addRoles(rolesForm: NgForm) {
    this.entities.forEach(res => {
      res.permissions.forEach(ich => {
        if (ich.checked) {
          this.permissions.push(ich.entityPermissionId);
        }
      });
    });

    const pos: PostRoles = {
      roleName: this.model.roleName,
      description: this.model.description,
      permissions: this.permissions
    };
    const that = this;
    this.stewardService.post('role', pos).subscribe(res => {
        console.log('permissions', this.permissions);
        if (res.code === 201) {
          that.notify.showSuccess(res.message);
          rolesForm.resetForm();
          that.router.navigate(['/home/user-management/roles']);
        } else {
          that.notify.showWarning(res.message);
        }
      },
      error => {
        that.notify.showWarning(error.error.message);
      });

  }

}

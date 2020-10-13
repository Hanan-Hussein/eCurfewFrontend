import {Component, OnInit} from '@angular/core';
import {Workgroups} from '../../../../../entities/workgroups-modules';
import {Roles} from '../../../../../entities/roles-modules';
import {StewardService} from '../../../../../shared/services/steward/steward.service';
import {GlobalParams} from '../../../../../shared/services/globalparams';
import {Notify} from '../../../../../shared/class/notify';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-view-workgroup',
  templateUrl: './view-workgroup.component.html',
  styleUrls: ['./view-workgroup.component.scss']
})
export class ViewWorkgroupComponent implements OnInit {
  model: Workgroups;
  roles: Roles[];
  isUpdate: boolean;
  isReadOnly = true;
  disabled = true;
  checkedRoles: number [] = [];

  constructor(private stewardService: StewardService<any, any>, private globalParam: GlobalParams,
              private notify: Notify, private router: Router,
              private route: ActivatedRoute) {
    this.model = new Workgroups();
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id'] != null) {
        this.fetchWorkgroup(params['id']);
      }
    });
    const that = this;
    const params: Map<any, string> = new Map();
    params.set('actionStatus', 'Approved');
    this.stewardService.get('role', params).subscribe(resp => {
      that.roles = resp.data.content;
    });
  }

  fetchWorkgroup(id: number) {
    const params: Map<any, string> = new Map();
    const inst = this;
    this.stewardService.get('workgroup/' + id, params).subscribe((response) => {
      if (response.code === 200) {
        inst.model = response.data;
      } else {
        inst.notify.showWarning(response.message);
      }
    });

    this.stewardService.get('workgroup/roles/' + id, params).subscribe((response) => {
      if (response.code === 200) {
        const data = response.data;
        console.log('Data:', data);
        data.forEach(role => {
          this.roles.map(mp => {
            if (mp.roleId === role.roleId) {
              mp.checked = true;
            }
          });

        });

      } else {
        this.isUpdate = false;
        inst.notify.showWarning(response.message);
      }
    });

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
    this.roles.forEach(res => {
      if (res.checked) {
        this.checkedRoles.push(res.roleId);
      }
    });
    this.model.workgroupRolesIds = this.checkedRoles;
    const inst = this;

    if (this.model.workgroupRolesIds.length < 1) {
      inst.notify.showWarning('You have not selected any role yet');
    } else {
      this.stewardService.put('workgroup', this.model).subscribe((response) => {
        console.log('response', response);
        if (response.code === 200) {
          inst.notify.showSuccess(response.message);
          form.resetForm();
          inst.router.navigate(['/home/user-management/workgroups']);
        } else {
          inst.notify.showWarning(response.message);
        }
      }, error => {
        console.log(error);
      });
    }

  }

}

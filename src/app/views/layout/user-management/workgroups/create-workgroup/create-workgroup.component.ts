import {Component, OnInit} from '@angular/core';
import {StewardService} from '../../../../../shared/services/steward/steward.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Roles} from '../../../../../entities/roles-modules';
import {GlobalParams} from '../../../../../shared/services/globalparams';
import {Notify} from '../../../../../shared/class/notify';
import {NgForm} from '@angular/forms';
import {Workgroups} from '../../../../../entities/workgroups-modules';

@Component({
  selector: 'app-create-workgroup',
  templateUrl: './create-workgroup.component.html',
  styleUrls: ['./create-workgroup.component.scss']
})
export class CreateWorkgroupComponent implements OnInit {
  model: Workgroups;
  roles: Roles[];
  checkedRoles: number [] = [];

  constructor(private stewardService: StewardService<any, any>, private globalParam: GlobalParams,
              private notify: Notify, private router: Router,
              private route: ActivatedRoute) {
    this.model = new Workgroups();
  }

  ngOnInit() {
    const that = this;
    const params: Map<any, string> = new Map();
    params.set('actionStatus', 'Approved');
    this.stewardService.get('role', params).subscribe(resp => {
      that.roles = resp.data.content;
    });
  }

  onCreate(form: NgForm) {
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
        this.stewardService.post('workgroup', this.model).subscribe((response) => {
          console.log('response', response);
          if (response.code === 201) {
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

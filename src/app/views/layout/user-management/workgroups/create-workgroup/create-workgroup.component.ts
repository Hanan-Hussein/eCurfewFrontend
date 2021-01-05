import {Component, OnInit} from '@angular/core';
import {StewardService} from '../../../../../shared/services/steward/steward.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Roles} from '../../../../../entities/roles-modules';
import {GlobalParams} from '../../../../../shared/services/globalparams';
import {Notify} from '../../../../../shared/class/notify';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {Workgroups} from '../../../../../entities/workgroups-modules';
import { FormBuilder } from '@angular/forms';
import { FormArray } from '@angular/forms';

@Component({
  selector: 'app-create-workgroup',
  templateUrl: './create-workgroup.component.html',
  styleUrls: ['./create-workgroup.component.scss']
})
export class CreateWorkgroupComponent implements OnInit {
  model: Workgroups;
  Workgroups: FormGroup;
 workgroupRoleForm: FormGroup;
 dummyroles=[{name:"approveRole",id:"1"},{name:"authenticateCustomer",id:"2"},{name:"disableRole",id:"3"},{name:"createRole",id:"4"},{name:"readRole",id:"5"},{name:"updateRole",id:"6"}];
 workgroupRoles:FormArray;


  roles: Roles[];
  checkedRoles: number [] = [];

  constructor(private stewardService: StewardService<any, any>, private globalParam: GlobalParams,
              private notify: Notify, private router: Router,
              private fb: FormBuilder,
              private route: ActivatedRoute) {
    this.model = new Workgroups();
  }

  ngOnInit() {
    const that = this;
    const params: Map<any, string> = new Map();
    // params.set('actionStatus', 'Approved');
    // this.stewardService.get('role', params).subscribe(resp => {
    //   that.roles = resp.data.content;
    // });
    this.Workgroups = this.fb.group({
      description:['',Validators.required],
      name:['',Validators.required],

      workgroupRoles: this.fb.array([]),
    });

  }
  checkValue(type: string, id: string) {
    if (type === 'roles') {
    return this.Workgroups.value[type].some(role => role.roleId === id);
    } else {
    return this.Workgroups.value[type] ? this.Workgroups.value[type].id === id : false;
    }
    }

    onRadioChange(data: string, event: any, type: string) {
    const newRole = { role: data };
    const roleFormArray = this.Workgroups.controls.workgroupRoles as FormArray;

    if (event && type === 'role') roleFormArray.push(new FormControl(newRole));
    else if (event && type === 'gender') {
    this.Workgroups.controls.gender = new FormControl({ id: event.value });
    } else if (event && type === 'document')
    this.Workgroups.controls.documentType = new FormControl({ id: event.value });
    else {
    if (type === 'role') {
    const index = roleFormArray.controls.findIndex(
    role => role.value === newRole,
    );
    roleFormArray.removeAt(index);
    }
    }
    }

  onCreate(form: NgForm) {
    // this.roles.forEach(res => {
    //   if (res.checked) {
    //     this.checkedRoles.push(res.roleId);
    //   }
    // });
    // this.model.workgroupRolesIds = this.checkedRoles;
    this.model=this.Workgroups.value;

    const inst = this;

    // if (this.model.workgroupRolesIds.length < 1) {
    //   inst.notify.showWarning('You have not selected any role yet');
    // } else {
        this.stewardService.post('fortis/rest/v2/services/fortis_MessageService/messageWorkgroups', {"workGroups":this.model}).subscribe((response: any) =>{
          console.log('response', this.model);
          if (response.code === 200) {
            inst.notify.showSuccess(response.message);
            // form.resetForm();
            inst.router.navigate(['/home/user-management/workgroups']);
          } else {
            inst.notify.showWarning(response.message);
          }
        }, error => {
          console.log(error);
          inst.notify.showWarning(error.error.message);
        });
    // }

  }

}

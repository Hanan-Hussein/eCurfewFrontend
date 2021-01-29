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
          roles = [{title:'USER',permissions:[{name:'CreateUser',id:'1'},{name:'UpdateUser',id:'2'},{name:'DisableUser',id:'3'},{name:'ReadUser',id:'4'},{name:'approveUser',id:'5'}]},
          {title:'Customers',permissions:[{name:'CreateCustomerRole',id:'6'},{name:'UpdateCustomer',id:'7'},{name:'disableCustomerRole',id:'8'},{name:"ReadCustomer",id:"9"},{name:"ApproveCustomer",id:"10"}]},
          {title:'Industry',permissions:[{name:'CreateIndustry',id:'11'},{name:'ReadIndustry',id:'12'},{name:"UpdateIndustry",id:"13"},{name:"DisableIndustry",id:"14"}]},
          {title:'Sector',permissions:[{name:'CreateSector',id:'15'},{name:"ReadSector",id:"16"},{name:"UpdateSector",id:"17"},{name:"disableSector",id:"18"}]},
          {title:'Customer Status',permissions:[{name:'CreateCustomerStatus',id:'19'},{name:"ReadCustomerStatus",id:"20"},{name:"UpdateCustomerStatus",id:"21"},{name:"DisableCustomerStatus",id:"22"}]},
          {title:'Account Officer',permissions:[{name:'CreateAccountOfficer',id:'23'},{name:'ReadAccountOfficer',id:'24'},{name:"UpdateAccountOfficer",id:"25"},{name:"DisableAccountOfficer",id:"26"}]},
          {title:'Authenticate Customer',permissions:[{name:'authenticateCustomer',id:'27'}]},
          {title:'Authentication Report',permissions:[{name:'AuthenticationReport',id:'28'}]},
          {title:'Audit Report',permissions:[{name:'AuditLogs',id:'29'}]},
          {title:'Session Report',permissions:[{name:'SessionLog',id:'30'}]},
          {title:'Work Groups',permissions:[{name:'ReadWorkGroups',id:'31'},{name:'CreateWorkGroups',id:'32'},{name:'ApproveWorkGroups',id:'33'},{name:'DisableWorkGroups',id:'34'},{name:'UpdateWorkGroup',id:'35',checked:false}]},



        ];
          workgroupRoles:FormArray;


  // roles: Roles[];
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

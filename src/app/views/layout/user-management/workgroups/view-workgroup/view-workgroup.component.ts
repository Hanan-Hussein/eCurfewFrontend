import {Component, OnInit} from '@angular/core';
import {Workgroups} from '../../../../../entities/workgroups-modules';
import {Roles} from '../../../../../entities/roles-modules';
import {StewardService} from '../../../../../shared/services/steward/steward.service';
import {GlobalParams} from '../../../../../shared/services/globalparams';
import {Notify} from '../../../../../shared/class/notify';
import {ActivatedRoute, Router} from '@angular/router';
import {FormArray, FormControl, NgForm} from '@angular/forms';
import { Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { event } from 'jquery';

@Component({
  selector: 'app-view-workgroup',
  templateUrl: './view-workgroup.component.html',
  styleUrls: ['./view-workgroup.component.scss']
})
export class ViewWorkgroupComponent implements OnInit {
  model: Workgroups;
  Workgroups: FormGroup;
  roles: Roles[];
  isUpdate: boolean;
  isReadOnly = true;
  disabled = true;
  checkedRoles: any [] = [];
  testArray: any[];
  @Output() id: string;
  workgroupRoleForm: FormGroup;
  rolesbackend:any;
  arraryofCheckedroles=[];
  emptyobject:any;
  // checked:boolean
  roles1 = [{title:'USER',permissions:[{name:'CreateUser',id:'1',checked:false},{name:'UpdateUser',id:'2',checked:false},{name:'DisableUser',id:'3',checked:false},{name:'ReadUser',id:'4',checked:false},{name:'approveUser',id:'5',checked:false}]},
  {title:'Customers',permissions:[{name:'CreateCustomerRole',id:'6',checked:false},{name:'UpdateCustomer',id:'7',checked:false},{name:'disableCustomerRole',id:'8',checked:false},{name:"ReadCustomer",id:"9",checked:false},{name:"ApproveCustomer",id:"10",checked:false}]},
  {title:'Industry',permissions:[{name:'CreateIndustry',id:'11',checked:false},{name:'ReadIndustry',id:'12',checked:false},{name:"UpdateIndustry",id:"13",checked:false},{name:"DisableIndustry",id:"14",checked:false}]},
  {title:'Sector',permissions:[{name:'CreateSector',id:'15',checked:false},{name:"ReadSector",id:"16",checked:false},{name:"UpdateSector",id:"17"},{name:"disableSector",id:"18",checked:false}]},
  {title:'Customer Status',permissions:[{name:'CreateCustomerStatus',id:'19',checked:false},{name:"ReadCustomerStatus",id:"20",checked:false},{name:"UpdateCustomerStatus",id:"21",checked:false},{name:"DisableCustomerStatus",id:"22",checked:false}]},
  {title:'Account Officer',permissions:[{name:'CreateAccountOfficer',id:'23',checked:false},{name:'ReadAccountOfficer',id:'24',checked:false},{name:"UpdateAccountOfficer",id:"25",checked:false},{name:"DisableAccountOfficer",id:"26",checked:false}]},
  {title:'Authenticate Customer',permissions:[{name:'authenticateCustomer',id:'27',checked:false}]},
  {title:'Authentication Report',permissions:[{name:'AuthenticationReport',id:'28',checked:false}]},
  {title:'Audit Report',permissions:[{name:'AuditLogs',id:'29',checked:false}]},
  {title:'Session Report',permissions:[{name:'SessionLog',id:'30',checked:false}]},
  {title:'Work Groups',permissions:[{name:'ReadWorkGroups',id:'31',checked:false},{name:'CreateWorkGroups',id:'32',checked:false},{name:'ApproveWorkGroups',id:'33',checked:false},{name:'DisableWorkGroups',id:'34',checked:false},{name:'UpdateWorkGroup',id:'35',checked:false}]},

];

  constructor(private stewardService: StewardService<any, any>, private globalParam: GlobalParams,
              private notify: Notify, private router: Router,
              private fb: FormBuilder,
              private route: ActivatedRoute) {
              this.model = new Workgroups();
              }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id'] != null) {
        this.fetchWorkgroup(params['id'],event,"role");
      }
    });
    this.Workgroups = this.fb.group({
      description:['',Validators.required],
      name:['',Validators.required],

      workgroupRoles: this.fb.array([]),
    });

    const that = this;
    const params: Map<any, string> = new Map();
    // params.set('actionStatus', 'Approved');
   params.set('view', 'workGroups-view');
    // this.stewardService.get('role', params).subscribe(resp => {
    //   that.roles = resp.data.content;
    // });
  }
  onRadioChange(data: string, event: any) {
    const newRole = { role: data };
    const roleFormArray = this.Workgroups.controls.workgroupRoles as FormArray;

    // const testArray=[];
if (event){
    // console.log("test array==",testArray.push (new FormControl(newRole)));
    //this.testArray.push(data);
    console.log('--------------->', data);
    roleFormArray.push(new FormControl(newRole));
}


    }

  fetchWorkgroup(id: number, event:any, type:string) {
    const params: Map<any, string> = new Map();
    params.set('view', 'workGroups-view');
    const inst = this;
    this.stewardService.get('fortis/rest/v2/entities/fortis_WorkGroups/' + id, params).subscribe((response) => {
      if (response) {
        this.Workgroups.controls["name"].setValue(response.name);
        this.Workgroups.controls["description"].setValue(response.description);
        this.model.name=response.name;
        this.model.description=response.description;
        this.model.workgroupRoles=response.workgroupRoles;
        this.rolesbackend = response.workgroupRoles;
        this.roles1.
        forEach(roles1 => {
          roles1.permissions.forEach(permissions =>{
            response.workgroupRoles.map(workgroupRoles => {
              if(workgroupRoles.role === permissions.name){
                permissions.checked=true;
                console.log(">>>>>",permissions);
              //   const newRole = { role: permissions.name };
              //   const roleFormArray = this.Workgroups.controls.workgroupRoles as FormArray;
              //  roleFormArray.push(new FormControl(newRole));
              // inst.checkValue('roles',permissions.id);
              //  inst.onRadioChange(permissions.name,event);
              }

            });
          });
        });


        this.id=response.id;

      }
         else {
          this.isUpdate = false;
        inst.notify.showWarning(response.message);
      }
    });


  }

  checkValue(type: string, id: string) {
    if (type === 'roles') {
      return this.Workgroups.value[type].some(role => role.roleId === id);
    } else {
    return this.Workgroups.value[type] ? this.Workgroups.value[type].id === id : false;
    }
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
    // this.roles.forEach(res =>
    this.roles1.
    forEach(roles1 => {
      roles1.permissions.forEach(permissions =>{
        if (permissions.checked) {

                this.checkedRoles.push(permissions.name);

        }
      });
    });
    //   if (res.checked) {
    //     this.checkedRoles.push(res.id);
    //   }
    // });
    // this.model=this.Workgroups.value;

    // this.model.workgroupRoles = new Workgroups();

    // console.log("checked roles",this.checkedRoles);


for (let index = 0; index < this.checkedRoles.length; index++) {
  const element = this.checkedRoles[index];

  this.arraryofCheckedroles.push({
    "role":element

  })

}
console.log("array",this.arraryofCheckedroles);

    this.model.workgroupRoles = this.arraryofCheckedroles;


      // workgroupRoles=this.checkedRoles;
    console.log(">>>>>>",this.model);
    const inst = this;

    if (this.model.workgroupRoles.length < 1) {
      inst.notify.showWarning('You have not selected any role yet');
    } else {
      this.stewardService.put('fortis/rest/v2/entities/fortis_WorkGroups/'+this.id, this.model).subscribe((response) => {
        console.log('response', response);
        if (response) {
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

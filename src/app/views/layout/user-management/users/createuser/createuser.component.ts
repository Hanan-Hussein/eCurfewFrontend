import { MatDialog } from '@angular/material/dialog';
import {CreateUserWrapper} from '../../../../../entities/wrappers/create-user-wrapper';
import {Roles} from '../../../../../entities/roles-modules';
import {StewardService} from '../../../../../shared/services/steward/steward.service';
import {Notify} from '../../../../../shared/class/notify';
import {routerTransition} from '../../../../../router.animations';
import {Router} from '@angular/router';
import {FormArray, FormBuilder, FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {Component, ElementRef, HostListener, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import { Gender } from '../../../../../../Sdk/enums/enums';
import { Fingers } from '../../../../../../Sdk/enums/enums';
import { DomSanitizer } from '@angular/platform-browser';


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
  accept: string;
  multiple: false;
  CreateUserWrapper: FormGroup;
  fileControl: FormGroup;
  workgroups: any = [];
  public isUpdate = false;
  gender: any =  [];
  // fingerPrint:any=[];
  // fingerType:any=[];
  isReadOnly = false;
  userType = [];
  @Output() id: string;
  subscription: Subscription;

  @ViewChild('fileInput', { static: false }) fileInput: ElementRef;
  constructor(public dialog: MatDialog,
    private stewardService: StewardService<any, any>,
    private notify: Notify,
    private fb: FormBuilder,
    private sanitizer: DomSanitizer,
    protected router: Router) {
    this.model = new CreateUserWrapper();
    // this.model.fingerPrint.id = null;

    this.subscription = new Subscription();
  }

  ngOnInit() {
    // this.gender = Object.values(Gender);

    // tslint:disable-next-line: forin
    for (const key in Gender){
        this.gender.push({number: key, word: Gender[key]});
    }
    console.log(this.gender);

    // for (const key in Fingers)
    // {
    //     this.fingerPrint.push({number: key, word: Fingers[key]});
    // }

    const params: Map<any, string> = new Map();
    const inst = this;

    this.CreateUserWrapper = this.fb.group({
      firstName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      lastName: ['', Validators.required],
      position: ['', Validators.required],
      nationalId: ['', Validators.required],
      email: ['', Validators.required],
      status: ['', Validators.required, Validators.email],
      gender: ['', Validators.required],
      file: ['', Validators.required],
      base64: ['', Validators.required],
      rightThumb: ['', Validators.required],
      rightIndex: ['', Validators.required],
      rightMid: ['', Validators.required],
      rightRing: ['', Validators.required],
      rightPinky: ['', Validators.required],
      leftThumb: ['', Validators.required],
      leftIndex: ['', Validators.required],
      leftMid: ['', Validators.required],
      leftRing: ['', Validators.required],
      leftPinky: ['', Validators.required],

      workGroups: this.fb.array([]),

    });
    this.stewardService.get('fortis/rest/v2/entities/fortis_WorkGroups/search?filter=%7B%22conditions%22%3A%20%5B%7B%22property%22%3A%20%22actionStatus%22%2C%22operator%22%3A%20%22%3D%22%2C%22value%22%3A%20%22APPROVED%22%20%7D%5D%7D&returnCount=true', params).subscribe((response: any) => {
      if (response) {
        console.log('>>>>>>>>>>>', response);
        inst.systemRoles = response;
      } else {
        inst.notify.showWarning(response.message);
      }
    });

    // this.CreateUserWrapper.controls.base64.setValue(this.hardcodedBase64);

  }
  checkValue(type: string, id: string) {
    if (type === 'roles') {
    return this.CreateUserWrapper.value[type].some(role => role.roleId === id);
    } else {
    return this.CreateUserWrapper.value[type] ? this.CreateUserWrapper.value[type].id === id : false;
    }
    }

    onRadioChange(data: string, event: any, type: string) {
    const newRole = { id: data };
    const roleFormArray = this.CreateUserWrapper.controls.workGroups as FormArray;

    if (event && type === 'role') { roleFormArray.push(new FormControl(newRole)); }else if (event && type === 'gender') {
    this.CreateUserWrapper.controls.gender = new FormControl({ id: event.value });
    } else if (event && type === 'document') {
    this.CreateUserWrapper.controls.documentType = new FormControl({ id: event.value });
 }else {
    if (type === 'role') {
    const index = roleFormArray.controls.findIndex(
    role => role.value === newRole,
    );
    roleFormArray.removeAt(index);
    }
    }
    }
  get email(){
    return this.CreateUserWrapper.get('email');
  }
  get phone(){
    return this.CreateUserWrapper.get('phoneNumber');
  }

    fileChange(event) {
    if (event.target.files.length > 0) {
        const file = event.target.files[0];
        this.CreateUserWrapper.get('file').setValue(file);
      }


}

  @HostListener('window:beforeunload')
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onCreateUser(form: NgForm) {
    const inst = this;
    const formData = new FormData();
    formData.append('file', this.CreateUserWrapper.get('file').value);
    this.model = this.CreateUserWrapper.value;
  //  this.stewardService.postFormDataMultipart('fortis/rest/v2/files', this.model).subscribe((res: any) => {
  //     console.log('>>>>>>>>>>>>>>>>>upload response', res);
  //     console.log('------------', res.id);
  //     console.log(this.model);
  //     this.model.profilePhoto = new Profile();
  //     this.model.profilePhoto.id = res.id;
      this.stewardService.post('app/rest/v2/services/ecurfew_CreateSystemUserService/createSystemUser', {'systemUser': this.model}).subscribe((response: any) => {
        console.log(response);
        if (response.code === 200) {
          console.log('rrrr', response);
          this.notify.showSuccess(response.message);

          this.router.navigate(['home/user-management/users']);
        } else {
          inst.notify.showWarning(response.message);
        }
    }, (error: any) => {
      form.reset();
      console.error(error.error.message);
    });
  // }, (error: any) => {
  //   form.reset();
  //   console.error(error.error);
  // });
  }

}

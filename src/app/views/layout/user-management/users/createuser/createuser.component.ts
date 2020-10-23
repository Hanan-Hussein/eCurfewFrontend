import { MatDialog } from '@angular/material/dialog';


import {CreateUserWrapper, Profile} from '../../../../../entities/wrappers/create-user-wrapper';
import {Roles} from '../../../../../entities/roles-modules';
import {StewardService} from '../../../../../shared/services/steward/steward.service';
import {Notify} from '../../../../../shared/class/notify';
import {routerTransition} from '../../../../../router.animations';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {Component, ElementRef, HostListener, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import { Gender } from '../../../../../../Sdk/enums/enums';

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
  accept:string;
  multiple:false;
  user: FormGroup;
  fileControl:FormGroup;
  workgroups: number[] = [];
  public isUpdate = false;
  gender:any =  [];
  userType = [];
  @Output() id: string;
  subscription: Subscription;
  @ViewChild('fileInput', { static: false }) fileInput: ElementRef;
  constructor(public dialog: MatDialog,
    private stewardService: StewardService<any, any>,
    private notify: Notify,
    private fb: FormBuilder,
    protected router: Router) {
    this.model = new CreateUserWrapper();
    // this.model.fingerPrint.id = null;

    this.subscription = new Subscription();
  }


  ngOnInit() {
    // this.gender = Object.values(Gender);

    for (const key in Gender)
    {
        this.gender.push({number: key, word: Gender[key]});
    }
    console.log(this.gender);

    const params: Map<any, string> = new Map();
    const inst = this;

    this.user = this.fb.group({
      file: [Validators.required]
      // email: ['', Validators.required],
      // fullName: ['', Validators.required],
      // nationalId: ['', Validators.required],
      // position: ['', Validators.required],

    });


    // params.set('actionStatus', 'Approved');
    this.stewardService.getToken('fortis/rest/v2/entities/sec$Group').subscribe((response:any) => {
      if (response.code === 200) {
        inst.systemRoles = response;
      } else {
        inst.notify.showWarning(response.message);
      }
    });
    // this.stewardService.get('gender').subscribe((response) => {

    //   if (response.code === 200) {
    //     inst.gender = response.data.content;
    //   } else {
    //     inst.notify.showWarning(response.message);
    //   }
    // });

  }
  fileChange(event) {
    if (event.target.files.length > 0) {
        const file = event.target.files[0];
        this.user.get('file').setValue(file);
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

      let picId: string = localStorage.getItem('picId');
      if(picId === null){
        inst.notify.showDanger('please upload the required files before submitting');
      }
      console.log(this.model);
      this.model.profilePhoto = new Profile();
      this.model.profilePhoto.id = picId;
      this.stewardService.post('fortis/rest/v2/entities/fortis_FortisUser', this.model).subscribe((response: any) => {
        if (response.id.length !== 0) {
          inst.notify.showSuccess('Request was successful');
          this.router.navigate(['home/user-management/users']);
          localStorage.removeItem('picId');
        } else {
          inst.notify.showWarning(response.message);
        }
      }, error => {
        console.log(error);
        inst.notify.showWarning(error.error.message);
      });
  }


  upload(form: NgForm){
    const formData = new FormData();
    formData.append('file', this.user.get('file').value);
    this.model = this.user.value;
    this.stewardService.postFormDataMultipart('fortis/rest/v2/files',this.model).subscribe((res: any) => {
      console.log('>>>>>>>>>>>>>>>>>upload response', res);
      localStorage.setItem('picId',res.id);
    },(error: any) => {
      form.reset();
      console.error(error.error);
    })
  }

}

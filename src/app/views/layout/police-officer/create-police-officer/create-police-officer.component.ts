import { MatDialog } from '@angular/material/dialog';
import { CreatePoliceOfficerWrapper, PoliceStation, Rank } from '../../../../entities/wrappers/create-police-officer-wrapper';
// import {Roles} from '../../../../../entities/roles-modules';
import { StewardService } from '../../../../shared/services/steward/steward.service';
import { Notify } from '../../../../shared/class/notify';
import { routerTransition } from '../../../../router.animations';
import {Router} from '@angular/router';
import {FormArray, FormBuilder, FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {Component, ElementRef, HostListener, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {Gender} from '../../../../../Sdk/enums/enums';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-create-police-officer',
  templateUrl: './create-police-officer.component.html',
  styleUrls: ['./create-police-officer.component.scss']
})
export class CreatePoliceOfficerComponent implements OnInit {
  ranks: any;
  policeStation: any;
  model: CreatePoliceOfficerWrapper;
  accept: string;
  multiple: false;
  CreatePoliceWrapper: FormGroup;
  fileControl: FormGroup;
  workgroups: any = [];
  public isUpdate = false;
  gender: any =  [];
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
    this.model = new CreatePoliceOfficerWrapper();

    this.subscription = new Subscription();
  }

  ngOnInit() {

    // tslint:disable-next-line: forin
    for (const key in Gender){
        this.gender.push({number: key, word: Gender[key]});
    }
    // console.log(this.gender);
    const params: Map<any, string> = new Map();
    const inst = this;

    this.CreatePoliceWrapper = this.fb.group({
      firstName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      lastName: ['', Validators.required],
      gender: ['', Validators.required],
      rank: ['', Validators.required],
      policeStationAssigned: ['', Validators.required],
      nationalId: ['', Validators.required],
      email: ['', Validators.required],
      serviceNumber: ['', Validators.required],
     // workGroups: this.fb.array([]),

    });
    this.stewardService.get('app/rest/v2/entities/ecurfew_Rank').subscribe((response) => {

      if (response) {
        this.ranks = response;

    } else {
        this.notify.showWarning(response.message);
    }
  });
  this.stewardService.get('app/rest/v2/entities/ecurfew_PoliceStation').subscribe((response) => {

    if (response) {
      this.policeStation = response;

  } else {
      this.notify.showWarning(response.message);
  }
});
  }
    onRadioChange(data: string, event: any, type: string) {
    const newRole = { id: data };
    const roleFormArray = this.CreatePoliceWrapper.controls.workGroups as FormArray;

    if (event && type === 'role') { roleFormArray.push(new FormControl(newRole)); }else if (event && type === 'gender') {
    this.CreatePoliceWrapper.controls.gender = new FormControl({ id: event.value });
    } else if (event && type === 'document') {
    this.CreatePoliceWrapper.controls.documentType = new FormControl({ id: event.value });
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
    return this.CreatePoliceWrapper.get('email');
  }
  get phone(){
    return this.CreatePoliceWrapper.get('phoneNumber');
  }

    fileChange(event) {
    if (event.target.files.length > 0) {
        const file = event.target.files[0];
        this.CreatePoliceWrapper.get('file').setValue(file);
      }


}

  @HostListener('window:beforeunload')
  // tslint:disable-next-line: use-life-cycle-interface
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onCreatePoliceOfficer(form: NgForm) {
    const inst = this;
    const formData = new FormData();
    this.model.rank = new Rank();
    this.model.policeStationAssigned = new PoliceStation();
    this.model.rank.id = this.CreatePoliceWrapper.value.rank;
    this.model.policeStationAssigned.id = this.CreatePoliceWrapper.value.policeStationAssigned;
    this.model.firstName = this.CreatePoliceWrapper.value.firstName;
    this.model.lastName = this.CreatePoliceWrapper.value.lastName;
    this.model.nationalId = this.CreatePoliceWrapper.value.nationalId;
    this.model.phoneNumber = this.CreatePoliceWrapper.value.phoneNumber;
    this.model.gender = this.CreatePoliceWrapper.value.gender;
    this.model.email = this.CreatePoliceWrapper.value.email;
    this.model.serviceNumber = this.CreatePoliceWrapper.value.serviceNumber;
    this.stewardService.post('app/rest/v2/services/ecurfew_CreatePoliceOfficerService/createPoliceOfficer', {'policeOfficer': this.model}).subscribe((response: any) => {
        console.log(response);
        if (response.code === 200) {
          console.log('rrrr', response);
          this.notify.showSuccess(response.message);

          this.router.navigate(['home/police/policeofficer']);
        } else {
          inst.notify.showWarning(response.message);
        }
    }, (error: any) => {
      form.reset();
      console.error(error.error.message);
    });
  }

}

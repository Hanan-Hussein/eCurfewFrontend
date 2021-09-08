import { MatDialog } from '@angular/material/dialog';
import { Category, CreateEssentialWorkerWrapper } from '../../../../entities/wrappers/create-essential-worker-wrapper';
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
  selector: 'app-create-essential-workers',
  templateUrl: './create-essential-workers.component.html',
  styleUrls: ['./create-essential-workers.component.scss']
})
export class CreateEssentialWorkersComponent implements OnInit {
  categories: any;
  policeStation: any;
  model: CreateEssentialWorkerWrapper;
  accept: string;
  multiple: false;
  CreateEssentialWorkerWrapper: FormGroup;
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
    this.model = new CreateEssentialWorkerWrapper();

    this.subscription = new Subscription();
  }

  ngOnInit() {

    // console.log(this.gender);
    const params: Map<any, string> = new Map();
    const inst = this;

    this.CreateEssentialWorkerWrapper = this.fb.group({
      firstName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      lastName: ['', Validators.required],
      nationalId: ['', Validators.required],
      category: ['', Validators.required],
      email: ['', Validators.required],
      employeeNumber: ['', Validators.required],

    });
    this.stewardService.get('app/rest/v2/entities/ecurfew_Category').subscribe((response) => {

      if (response) {
        this.categories = response;

    } else {
        this.notify.showWarning(response.message);
    }
  });

  }

  get email(){
    return this.CreateEssentialWorkerWrapper.get('email');
  }
  get phone(){
    return this.CreateEssentialWorkerWrapper.get('phoneNumber');
  }

    fileChange(event) {
    if (event.target.files.length > 0) {
        const file = event.target.files[0];
        this.CreateEssentialWorkerWrapper.get('file').setValue(file);
      }
}

  @HostListener('window:beforeunload')
  // tslint:disable-next-line: use-life-cycle-interface
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onCreateEssentialWorker(form: NgForm) {
    const inst = this;
    const formData = new FormData();
    this.model.category = new Category();
    this.model.category.id = this.CreateEssentialWorkerWrapper.value.category;
    this.model.firstName = this.CreateEssentialWorkerWrapper.value.firstName;
    this.model.lastName = this.CreateEssentialWorkerWrapper.value.lastName;
    this.model.nationalId = this.CreateEssentialWorkerWrapper.value.nationalId;
    this.model.phoneNumber = this.CreateEssentialWorkerWrapper.value.phoneNumber;
    this.model.email = this.CreateEssentialWorkerWrapper.value.email;
    this.model.employeeNumber = this.CreateEssentialWorkerWrapper.value.employeeNumber;
    this.stewardService.post('app/rest/v2/services/ecurfew_CreateEssentialWorkersService/createEssentialWorkers', {'essentialWorkers': this.model}).subscribe((response: any) => {
        console.log(response);
        if (response.code === 200) {
          console.log('rrrr', response);
          this.notify.showSuccess(response.message);

          this.router.navigate(['home/citizens/essential-workers']);
        } else {
          inst.notify.showWarning(response.message);
        }
    }, (error: any) => {
      form.reset();
      console.error(error.error.message);
    });
  }

}

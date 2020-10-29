import { Component, OnInit, OnDestroy, HostListener, ElementRef, ViewChild } from '@angular/core';

import { Subscription } from 'rxjs';

import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { CustomerModel, idDocument, Photo, Signature } from '../../../../entities/customer-model';
import { StewardService } from '../../../../shared/services/steward/steward.service';
import { Notify } from '../../../../shared/class/notify';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-createcustomer',
  templateUrl: './createcustomer.component.html',
  styleUrls: ['./createcustomer.component.css']
})
export class CreatecustomerComponent implements OnInit, OnDestroy {
  // isLinear = true;
  model: CustomerModel;
  subscription: Subscription;
  customer: FormGroup;
  customerModel:FormGroup;
  isUpdate: boolean;
  isReadOnly = false;
  disabled = false;
  isView = false;
  countries= [];
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  file: File;
  @ViewChild('fileInput', { static: false }) fileInput: ElementRef;
  @ViewChild('file2Input', { static: false }) file2Input: ElementRef;

  constructor(
    private _formBuilder: FormBuilder,
    private stewardService: StewardService<any, any>,
    private notify: Notify,
    protected router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute) {
    this.model = new CustomerModel();
    this.subscription = new Subscription();
  }

  ngOnInit() {
    this.customerModel = this.fb.group({
      idNumber: ['',Validators.required],
      firstName:['',Validators.required],
      mobileNumber:['',Validators.required],
      surname:['',Validators.required],
      occupation:['',Validators.required],
      employeeNumber:['',Validators.required],
      kraPin:['',Validators.required],
      emailAddress:['',Validators.required],
      file: [Validators.required],
      file1: [Validators.required]
    });

    this.customer = this.fb.group({
      file: [Validators.required]


    });

  }

  @HostListener('window:beforeunload')
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }


  fileChange(event) {
    if (event.target.files.length > 0) {
        const file = event.target.files[0];
        this.customerModel.get('file').setValue(file);
      }
}

file1Change(event) {
  if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.customerModel.get('file1').setValue(file);
    }
}


  onCreateForm() {
    const inst = this;

    const formData = new FormData();
    const formData1 = new FormData();

    formData.append('file', this.customerModel.get('file').value);

    this.model = this.customerModel.value;
    this.stewardService.postFormDataMultipart('fortis/rest/v2/files',this.model).subscribe((res1: any) => {
      if(res1.id){
        formData1.append('file', this.customerModel.get('file1').value)
        const sendFile = {
          file: this.model.file1
        }
        this.stewardService.postFormDataMultipart('fortis/rest/v2/files',sendFile).subscribe((res: any) => {
          if(res1.id){
            console.log('===========>', res1.id);
            console.log('----------->', res.id);
            // this.model.customerPhoto.id=res1.id;
            this.model.customerPhoto=new Photo();

                this.model.nationalId=new idDocument();

                this.model.customerPhoto.id = res1.id;
            this.model.nationalId.id = res.id;
            console.log(">>>>>>>>",this.model);
            this.stewardService.post('fortis/rest/v2/entities/fortis_CustomerDetails', this.model).subscribe((response:any) => {

              if (response.id.length !== 0) {
                inst.notify.showSuccess(response.message);
                this.router.navigate(['home/customers/customers']);
              } else {
                inst.notify.showWarning(response.message);
              }
            }, error => {
              inst.notify.showWarning(error.error.message);
            });
          } else {

          }
        },(error: any) => {
          console.error(error.error);
        })
      } else {

      }
    },(error: any) => {
      console.error(error.error);
    })



  }


}


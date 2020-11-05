import { Component, OnInit, OnDestroy, HostListener, ElementRef, ViewChild } from '@angular/core';

import { Subscription } from 'rxjs';

import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { accountofficer, CustomerModel, Customerstatus, idDocument, industries, Photo, Sectors, Signature } from '../../../../entities/customer-model';
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
  industries:any;
  customerStatus:any;
  accOfficer:any;
  sectors:any;
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
    this.secondFormGroup=this.fb.group({
      customerID:['',Validators.required],
    })
    this.customerModel = this.fb.group({
      idNumber: ['',Validators.required],
      firstName:['',Validators.required],
      mobileNumber:['',Validators.required],
      surname:['',Validators.required],
      occupation:['',Validators.required],
      employeeNumber:['',Validators.required],
      kraPin:['',Validators.required],
      emailAddress:['',Validators.required],
      nextofkinname:['',Validators.required],
      nextofkinrelationship:['',Validators.required],
      nextofkinmobileNumber:['',Validators.required],
      nextofkinaddress:['',Validators.required],
      nextofkinoccupation:['',Validators.required],
      currentAddress:['',Validators],
      file: [Validators.required],
      file1: [Validators.required],
      ids:['',Validators.required],
      status:['',Validators.required],
      account_officer:['',Validators.required],
      sectors:['',Validators.required]

    });

          this.stewardService.get('fortis/rest/v2/entities/fortis_Industry').subscribe((response) => {

            if (response) {
              this.industries = response;

          } else {
              this.notify.showWarning(response.message);
          }
        });

        this.stewardService.get('fortis/rest/v2/entities/fortis_CustomerStatus').subscribe((response) => {
          console.log(response);

          if (response) {
            this.customerStatus = response;

        } else {
            this.notify.showWarning(response.message);
        }
      });
      this.stewardService.get('fortis/rest/v2/entities/fortis_AccountOfficer').subscribe((response) => {
        console.log(response);

        if (response) {
          this.accOfficer = response;

      } else {
          this.notify.showWarning(response.message);
      }
    });
         this.stewardService.get('fortis/rest/v2/entities/fortis_Sector').subscribe((response) => {
          console.log(response);

          if (response) {
            this.sectors = response;

        } else {
            this.notify.showWarning(response.message);
        }
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
onSecondForm(){
  const inst = this;
  this.model=this.secondFormGroup.value;
  this.stewardService.post('fortis/rest/v2/services/fortis_CustomerKycService/ValidateCustomerakyc' ,this.model).subscribe((response: any) => {
    if(response){
      this.model.customerID=response.customerID;
      this.customerModel.get('idNumber').setValue(this.secondFormGroup.get("customerID").value);
      this.customerModel.get('surname').setValue(response.surName);
      this.customerModel.get('firstName').setValue(response.firstName)

    //  console.log(">>>>>>>>>>>",response);
    }

  }, error => {
    inst.notify.showWarning(error.error.message);
  });

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
            this.model.industry=new industries();
            this.model.customerPhoto=new Photo();
            this.model.nationalId=new idDocument();
            this.model.customerStatus=new Customerstatus();
            this.model.accountOfficer=new accountofficer();
            this.model.sector=new Sectors();

            this.model.customerPhoto.id = res1.id;
            this.model.nationalId.id = res.id;
            console.log(">>>>>>>>",this.model);
            this.model.industry.id=this.customerModel.value.ids;
            this.model.customerStatus.id=this.customerModel.value.status;
            this.model.sector.id=this.customerModel.value.sectors;

            this.model.accountOfficer.id=this.customerModel.value.account_officer;
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


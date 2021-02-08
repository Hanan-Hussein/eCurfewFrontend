import { Component, OnInit, OnDestroy, HostListener, ElementRef, ViewChild } from '@angular/core';

import { Subscription } from 'rxjs';

import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { accountofficer, CustomerModel, Customerstatus, uploadRequest, idDocument, industries, Photo, Print, Sectors, Signature } from '../../../../entities/customer-model';
import { StewardService } from '../../../../shared/services/steward/steward.service';
import { Notify } from '../../../../shared/class/notify';
import { Observable } from 'rxjs';
// sanitize the base64string
import { DomSanitizer } from '@angular/platform-browser';

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

  // All FingerPrint related stuff
  fingerprint:any;
  imageSource;rightThumbSource;rightIndexSource;rightMidSource;rightRingSource;rightPinkySource;
  leftThumbSource;leftIndexSource;leftMidSource;leftRingSource;leftPinkySource;
  scanned=false;rightThumbScanned=false;rightIndexScanned=false;rightMidScanned=false;rightRingScanned=false;rightPinkyScanned=false;
  leftThumbScanned=false;leftIndexScanned=false;leftMidScanned=false;leftRingScanned=false;leftPinkyScanned=false;
  base64FingerPrint:any;
  right_thumb:any;
  right_index:any;
  right_mid:any;
  right_ring:any;
  right_pinky:any;
  left_thumb:any;
  left_index:any;
  left_mid:any;
  left_ring:any;
  left_pinky:any;
  firstName: any;
  fingerType:string;
  prints:any [] = [];


  constructor(
    private sanitizer:DomSanitizer,
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
      idNumber: ['',Validators.required, Validators.pattern(/^(?=.*[A-z].*[A-z])[A-z-'.\s]{3,}$/)],
      firstName:['',Validators.required],
      mobileNumber:['',[Validators.required,Validators.pattern('^[2][5][4][0-9]{9}$')]],
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
      sectors:['',Validators.required],
      base64:['',Validators.required],
      title: ['',Validators.required],
      otherNames: ['',Validators.required],
      dateOfBirth: ['',Validators.required],
      signature: ['',Validators.required],
      rightThumb:['',Validators.required],
      rightIndex:['',Validators.required],
      rightMid:['',Validators.required],
      rightRing:['',Validators.required],
      rightPinky:['',Validators.required],
      leftThumb:['',Validators.required],
      leftIndex:['',Validators.required],
      leftMid:['',Validators.required],
      leftRing:['',Validators.required],
      leftPinky:['',Validators.required]

    });
    this.firstName=this.customerModel.get('firstName');
    // this.customerModel.controls.base64.setValue(this.hardcodedBase64);

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

  // Method that calls the TornadoFx(javaFX) methods to Open USB finger print scanner.
  scanFingerPrint(){
    this.stewardService.getFingerPrint('http://localhost:8080/launchmso').subscribe((response) => {
      if (response.payload) {
        this.scanned=true;
        this.imageSource =this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/bmp;base64,${response.payload}`);
        this.base64FingerPrint = response.payload;
        this.customerModel.patchValue({
          base64:this.base64FingerPrint
        });

        this.notify.showSuccess("Finger print scanned");

      } else {
        this.notify.showWarning("Make sure the Desktop FingerPrint Scanner is Running");
      }
    },
     error => {
      this.notify.showWarning("no server");
    });
  }
  rightThumb(){
    this.stewardService.getFingerPrint('http://localhost:8080/launchmso').subscribe((response) => {
      if (response.payload) {
        this.rightThumbScanned=true;
        this.rightThumbSource =this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/bmp;base64,${response.payload}`);
        this.right_thumb = response.payload;
        this.customerModel.patchValue({
          rightThumb:this.right_thumb
        });

        this.notify.showSuccess("Finger print scanned");

      } else {
        this.notify.showWarning("Make sure the Desktop FingerPrint Scanner is Running");
      }
    },
     error => {
      this.notify.showWarning("no server");
    });
  }
  rightIndex(){
    this.stewardService.getFingerPrint('http://localhost:8080/launchmso').subscribe((response) => {
      if (response.payload) {
        this.rightIndexScanned=true;
        this.rightIndexSource =this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/bmp;base64,${response.payload}`);
        this.right_index = response.payload;
        this.customerModel.patchValue({
          rightIndex:this.right_index
        });

        this.notify.showSuccess("Finger print scanned");

      } else {
        this.notify.showWarning("Make sure the Desktop FingerPrint Scanner is Running");
      }
    },
     error => {
      this.notify.showWarning("no server");
    });
  }
  rightMid(){
    this.stewardService.getFingerPrint('http://localhost:8080/launchmso').subscribe((response) => {
      if (response.payload) {
        this.rightMidScanned=true;
        this.rightMidSource =this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/bmp;base64,${response.payload}`);
        this.right_mid = response.payload;
        this.customerModel.patchValue({
          rightMid:this.right_mid
        });

        this.notify.showSuccess("Finger print scanned");

      } else {
        this.notify.showWarning("Make sure the Desktop FingerPrint Scanner is Running");
      }
    },
     error => {
      this.notify.showWarning("no server");
    });
  }
  rightRing(){
    this.stewardService.getFingerPrint('http://localhost:8080/launchmso').subscribe((response) => {
      if (response.payload) {
        this.rightRingScanned=true;
        this.rightRingSource =this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/bmp;base64,${response.payload}`);
        this.right_ring = response.payload;
        this.customerModel.patchValue({
          rightRing:this.right_ring
        });

        this.notify.showSuccess("Finger print scanned");

      } else {
        this.notify.showWarning("Make sure the Desktop FingerPrint Scanner is Running");
      }
    },
     error => {
      this.notify.showWarning("no server");
    });
  }
  rightPinky(){
    this.stewardService.getFingerPrint('http://localhost:8080/launchmso').subscribe((response) => {
      if (response.payload) {
        this.rightPinkyScanned=true;
        this.rightPinkySource =this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/bmp;base64,${response.payload}`);
        this.right_pinky = response.payload;
        this.customerModel.patchValue({
          rightPinky:this.right_pinky
        });

        this.notify.showSuccess("Finger print scanned");

      } else {
        this.notify.showWarning("Make sure the Desktop FingerPrint Scanner is Running");
      }
    },
     error => {
      this.notify.showWarning("no server");
    });
  }
  leftThumb(){
    this.stewardService.getFingerPrint('http://localhost:8080/launchmso').subscribe((response) => {
      if (response.payload) {
        this.leftThumbScanned=true;
        this.leftThumbSource =this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/bmp;base64,${response.payload}`);
        this.left_thumb = response.payload;
        this.customerModel.patchValue({
          leftThumb:this.left_thumb
        });

        this.notify.showSuccess("Finger print scanned");

      } else {
        this.notify.showWarning("Make sure the Desktop FingerPrint Scanner is Running");
      }
    },
     error => {
      this.notify.showWarning("no server");
    });
  }
  leftIndex(){
    this.stewardService.getFingerPrint('http://localhost:8080/launchmso').subscribe((response) => {
      if (response.payload) {
        this.leftIndexScanned=true;
        this.leftIndexSource =this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/bmp;base64,${response.payload}`);
        this.left_index = response.payload;
        this.customerModel.patchValue({
          leftIndex:this.left_index
        });

        this.notify.showSuccess("Finger print scanned");

      } else {
        this.notify.showWarning("Make sure the Desktop FingerPrint Scanner is Running");
      }
    },
     error => {
      this.notify.showWarning("no server");
    });
  }
  leftMid(){
    this.stewardService.getFingerPrint('http://localhost:8080/launchmso').subscribe((response) => {
      if (response.payload) {
        this.leftMidScanned=true;
        this.leftMidSource =this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/bmp;base64,${response.payload}`);
        this.left_mid = response.payload;
        this.customerModel.patchValue({
          leftMid:this.left_mid
        });

        this.notify.showSuccess("Finger print scanned");

      } else {
        this.notify.showWarning("Make sure the Desktop FingerPrint Scanner is Running");
      }
    },
     error => {
      this.notify.showWarning("no server");
    });
  }
  leftRing(){
    this.stewardService.getFingerPrint('http://localhost:8080/launchmso').subscribe((response) => {
      if (response.payload) {
        this.leftRingScanned=true;
        this.leftRingSource =this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/bmp;base64,${response.payload}`);
        this.left_ring = response.payload;
        this.customerModel.patchValue({
          leftRing:this.left_ring
        });

        this.notify.showSuccess("Finger print scanned");

      } else {
        this.notify.showWarning("Make sure the Desktop FingerPrint Scanner is Running");
      }
    },
     error => {
      this.notify.showWarning("no server");
    });
  }
  leftPinky(){
    this.stewardService.getFingerPrint('http://localhost:8080/launchmso').subscribe((response) => {
      if (response.payload) {
        this.leftPinkyScanned=true;
        this.leftPinkySource =this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/bmp;base64,${response.payload}`);
        this.left_pinky = response.payload;
        this.customerModel.patchValue({
          leftPinky:this.left_pinky
        });

        this.notify.showSuccess("Finger print scanned");

      } else {
        this.notify.showWarning("Make sure the Desktop FingerPrint Scanner is Running");
      }
    },
     error => {
      this.notify.showWarning("no server");
    });
  }

  get email(){
    return this.customerModel.get('emailAddress');
  }
  get phone(){
    return this.customerModel.get('mobileNumber');
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
fileSignature(event) {
  if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.customerModel.get('signature').setValue(file);
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
get customerModelControl() {
  return this.customerModel.controls;
}



onCreateForm() {
  const inst = this;

  const formData = new FormData();
  const formData1 = new FormData();
  const formData2=new FormData();


// this.model=this.customerModel.get('base64').value;
 this.model.rightThumb=this.customerModel.get('rightThumb').value;
 this.model.rightIndex=this.customerModel.get('rightIndex').value;
 this.model.rightMid=this.customerModel.get('rightMid').value;
 this.model.rightRing=this.customerModel.get('rightRing').value;
 this.model.rightPinky=this.customerModel.get('rightPinky').value;
 this.model.leftThumb=this.customerModel.get('leftThumb').value;
 this.model.leftIndex=this.customerModel.get('leftIndex').value;
 this.model.leftMid=this.customerModel.get('leftMid').value;
 this.model.leftRing=this.customerModel.get('leftRing').value;
 this.model.leftPinky=this.customerModel.get('leftPinky').value;

 this.stewardService.post('fortis/rest/v2/services/fortis_UploadFingerPrintsService/UploadFile',
 {uploadRequest:
    {"rightThumbPrint":this.model.rightThumb,
     "rightIndexPrint":this.model.rightIndex,
     "rightMidPrint":this.model.rightMid,
     "rightRingPrint":this.model.rightRing,
     "rightPinkyPrint":this.model.rightPinky,
     "leftThumbPrint":this.model.leftThumb,
     "leftIndexPrint":this.model.leftIndex,
     "leftMiddlePrint":this.model.leftMid,
     "leftRingPrint":this.model.leftRing,
     "leftPinkyPrint":this.model.leftPinky}}).subscribe((res3:any)=>  {
  //   if(res3.id){
  //   this.model.uploadRequest.file=res3.id;
  // //  console.log(">>>>>>>>>>fingerprint",res3.data);
  //   }
  this.prints=[];


  formData.append('file', this.customerModel.get('file').value);

  this.model = this.customerModel.value;
  this.stewardService.postFormDataMultipart('fortis/rest/v2/files',this.model).subscribe((res1: any) => {
    if(res1.id){
      formData1.append('file', this.customerModel.get('file1').value)
      const sendFile = {
        file: this.model.file1
      }
      this.stewardService.postFormDataMultipart('fortis/rest/v2/files',sendFile).subscribe((res: any) => {
        if(res.id){
          formData2.append('file',this.customerModel.get('signature').value)
          const signature = {
            file: this.model.signature
          }
          this.stewardService.postFormDataMultipart('fortis/rest/v2/files',signature).subscribe((res2:any)=> {
            if(res2.id){


          // console.log('===========>', res1.id);
          // console.log('----------->', res.id);
          this.model.industry=new industries();
          this.model.customerPhoto=new Photo();
          this.model.nationalId=new idDocument();
          this.model.signature=new Signature();
          this.model.customerStatus=new Customerstatus();
          this.model.accountOfficer=new accountofficer();
          this.model.sector=new Sectors();
          //this.model.fingerPrint=new Print();

          this.model.customerPhoto.id = res1.id;
          this.model.nationalId.id = res.id;
         // this.model.fingerPrint.id=res3.data;
          this.model.signature.id=res2.id;
          console.log(">>>>>>>>",this.model);
          this.model.industry.id=this.customerModel.value.ids;
          this.model.customerStatus.id=this.customerModel.value.status;
          this.model.sector.id=this.customerModel.value.sectors;

          this.model.accountOfficer.id=this.customerModel.value.account_officer;
          if(res3.leftThumbPrint){
            this.fingerType="LEFTTHUMB";
            this.prints.push({
              "fingerType":this.fingerType,
              "file":{"id":res3.leftThumbPrint}

            });
          }
          if(res3.leftIndexPrint){
            this.fingerType="LEFTINDEX"
            this.prints.push({
              "fingerType":this.fingerType,
              "file":{"id":res3.leftIndexPrint}

            });
          }
          if(res3.leftMiddlePrint){
            this.fingerType="LEFTMIDDLE";
            this.prints.push({
              "fingerType":this.fingerType,
              "file":{"id":res3.leftMiddlePrint}

            });
          }
          if(res3.leftRingPrint){
            this.fingerType="LEFTRING";
            this.prints.push({
              "fingerType":this.fingerType,
              "file":{"id":res3.leftRingPrint}

            });
          }
          if(res3.leftPinkyPrint){
            this.fingerType="LEFTPINKY";
            this.prints.push({
              "fingerType":this.fingerType,
              "file":{"id":res3.leftPinkyPrint}

            });
          }
          if(res3.rightThumbPrint){
            this.fingerType="RIGHTTHUMB";
            this.prints.push({
              "fingerType":this.fingerType,
              "file":{"id":res3.rightThumbPrint}

            });
          }
          if(res3.rightIndexPrint){
            this.fingerType="RIGHTINDEX"
            this.prints.push({
              "fingerType":this.fingerType,
              "file":{"id":res3.rightIndexPrint}

            });
          }
          if(res3.rightMidPrint){
            this.fingerType="RIGHTMIDDLE"
            this.prints.push({
              "fingerType":this.fingerType,
             "file":{"id":res3.rightMidPrint}

            });
          }
          if(res3.rightRingPrint){
            this.fingerType="RIGHTRING"
            this.prints.push({
              "fingerType":this.fingerType,
             "file":{"id":res3.rightRingPrint}

            });
          }
          if(res3.rightPinkyPrint){
            this.fingerType="RIGHTPINKY"
            this.prints.push({
              "fingerType":this.fingerType,
              "file":{"id":res3.rightPinkyPrint}

            });
          }
          this.model.fingerPrints=this.prints;

          this.stewardService.post('fortis/rest/v2/services/fortis_CreateCustomerService/CreateCustomer', {"customerDetails":this.model}).subscribe((response:any) => {

            if (response.code === 200) {
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
    } else {

    }
  },(error: any) => {
    console.error(error.error);
  })

},(error: any) => {
  console.error(error.error);
})


}


}

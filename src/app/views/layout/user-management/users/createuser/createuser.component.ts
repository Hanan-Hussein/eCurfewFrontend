import { MatDialog } from '@angular/material/dialog';


import {CreateUserWrapper, Print, Profile} from '../../../../../entities/wrappers/create-user-wrapper';
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
  accept:string;
  multiple:false;
  CreateUserWrapper: FormGroup;
  fileControl:FormGroup;
  workgroups : any=[];
  public isUpdate = false;
  gender:any =  [];
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
    private sanitizer:DomSanitizer,
    protected router: Router) {
    this.model = new CreateUserWrapper();
    // this.model.fingerPrint.id = null;

    this.subscription = new Subscription();
  }
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
  prints:any [] = [];
  fingerPrintResponse=[];
  fingerType:string;
  ngOnInit() {
    // this.gender = Object.values(Gender);

    for (const key in Gender)
    {
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
      firstName:['',Validators.required],
      phoneNumber:['', Validators.required],
      lastName:['',Validators.required],
      position:['',Validators.required],
      nationalId:['',Validators.required],
      email:['',Validators.required],
      status:['',Validators.required,Validators.email],
      gender:['',Validators.required],
      file: ['',Validators.required],
      base64:['',Validators.required],
      rightThumb:['',Validators.required],
      rightIndex:['',Validators.required],
      rightMid:['',Validators.required],
      rightRing:['',Validators.required],
      rightPinky:['',Validators.required],
      leftThumb:['',Validators.required],
      leftIndex:['',Validators.required],
      leftMid:['',Validators.required],
      leftRing:['',Validators.required],
      leftPinky:['',Validators.required],

      workGroups:this.fb.array([]),

    });
    this.stewardService.get('fortis/rest/v2/entities/fortis_WorkGroups/search?filter=%7B%22conditions%22%3A%20%5B%7B%22property%22%3A%20%22actionStatus%22%2C%22operator%22%3A%20%22%3D%22%2C%22value%22%3A%20%22APPROVED%22%20%7D%5D%7D&returnCount=true', params).subscribe((response:any) => {
      if (response) {
        console.log(">>>>>>>>>>>",response);
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

    if (event && type === 'role') roleFormArray.push(new FormControl(newRole));
    else if (event && type === 'gender') {
    this.CreateUserWrapper.controls.gender = new FormControl({ id: event.value });
    } else if (event && type === 'document')
    this.CreateUserWrapper.controls.documentType = new FormControl({ id: event.value });
    else {
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
  scanFingerPrint(){
    this.stewardService.getFingerPrint('http://localhost:8080/launchmso').subscribe((response) => {
      if (response.payload) {
        this.scanned=true;
        this.imageSource =this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/bmp;base64,${response.payload}`);
        this.base64FingerPrint = response.payload;
        this.CreateUserWrapper.patchValue({
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
        this.CreateUserWrapper.patchValue({
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
        this.CreateUserWrapper.patchValue({
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
        this.CreateUserWrapper.patchValue({
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
        this.CreateUserWrapper.patchValue({
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
        this.CreateUserWrapper.patchValue({
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
        this.CreateUserWrapper.patchValue({
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
        this.CreateUserWrapper.patchValue({
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
        this.CreateUserWrapper.patchValue({
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
        this.CreateUserWrapper.patchValue({
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
        this.CreateUserWrapper.patchValue({
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
    // this.systemRoles.forEach(res => {
    //   if (res.checked) {
    //     this.workgroups.push(res.id);
    //   }
    // });
    //this.model=this.CreateUserWrapper.get('base64').value;
    this.model.rightThumb=this.CreateUserWrapper.get('rightThumb').value;
    this.model.rightIndex=this.CreateUserWrapper.get('rightIndex').value;
    this.model.rightMid=this.CreateUserWrapper.get('rightMid').value;
    this.model.rightRing=this.CreateUserWrapper.get('rightRing').value;
    this.model.rightPinky=this.CreateUserWrapper.get('rightPinky').value;
    this.model.leftThumb=this.CreateUserWrapper.get('leftThumb').value;
    this.model.leftIndex=this.CreateUserWrapper.get('leftIndex').value;
    this.model.leftMid=this.CreateUserWrapper.get('leftMid').value;
    this.model.leftRing=this.CreateUserWrapper.get('leftRing').value;
    this.model.leftPinky=this.CreateUserWrapper.get('leftPinky').value;

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
          "leftPinkyPrint":this.model.leftPinky}}).subscribe((res3:any)=>
      {
        // if(res3){
        //   console.log("file upload response",res3);
        // }
    //   if(res3.id){
    //   this.model.uploadRequest.file=res3.id;
    //  console.log(">>>>>>>>>>fingerprint",res3.data);
    //   }

   this.prints=[];
    const formData = new FormData();
    formData.append('file', this.CreateUserWrapper.get('file').value);
    // this.model = this.CreateUserWrapper.get('file').value;
    this.model=this.CreateUserWrapper.value;
   this.stewardService.postFormDataMultipart('fortis/rest/v2/files',this.model).subscribe((res: any) => {
      console.log('>>>>>>>>>>>>>>>>>upload response', res);
      console.log("------------",res.id);
      // let picId: string = localStorage.getItem('picId');
      // if(picId === null){
      //   inst.notify.showDanger('please upload the required files before submitting');
      // }
      console.log(this.model);
      this.model.profilePhoto = new Profile();
      this.model.profilePhoto.id = res.id;
      //this.model.fingerPrint=new Print();
      //this.model.fingerPrint.id=res3.data;
      console.log("res3",res3);
      //this.fingerPrintResponse.push(res3);
     // console.log("out",this.prints);

      //console.log("FingerPrint Response",this.fingerPrintResponse);
     // this.fingerPrintResponse.forEach(printRes=>{
        // for (let index = 0; index < this.fingerPrintResponse.length; index++) {
        //   const element = this.fingerPrintResponse[index];
        //  console.log("element",element.leftThumbPrint);

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
        // }
          // this.prints.push({
          //   "fingerType":this.fingerType,
          //   "file":{"id":element}

          // });

         // console.log("Finale",this.prints);

        }
        // this.prints.push({
        //   "fingerType":this.fingerType,
        //   "file":{"id":res3.rightPinkyPrint}

        // });

        this.model.fingerPrints=this.prints;

      this.stewardService.post('fortis/rest/v2/services/fortis_CreateFortisUserService/createFortisUser', {"fortisUser":this.model}).subscribe((response: any) => {
        console.log(response);
        if (response.code === 200) {
          console.log("rrrr",response);
          this.notify.showSuccess(response.message);

          this.router.navigate(['home/user-management/users']);
        } else {
          inst.notify.showWarning(response.message);
        }
      }, error => {
        console.log(error);
        inst.notify.showWarning(error.error.message);
      });

    },(error: any) => {
      form.reset();
      console.error(error.error);
    });
  },(error: any) => {
    form.reset();
    console.error(error.error);
  })
  }

}

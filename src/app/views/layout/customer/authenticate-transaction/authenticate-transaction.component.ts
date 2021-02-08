import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthenticateModel } from '../../../../entities/authenticate-transaction';
import { Notify } from '../../../../shared/class/notify';
import { StewardService } from '../../../../shared/services/steward/steward.service';
import { DomSanitizer } from '@angular/platform-browser';
import { NgForm } from '@angular/forms';
import { Fingers } from '../../../../../Sdk/enums/enums';


@Component({
  selector: 'app-authenticate-transaction',
  templateUrl: './authenticate-transaction.component.html',
  styleUrls: ['./authenticate-transaction.component.scss']
})
export class AuthenticateTransactionComponent implements OnInit {
  model: AuthenticateModel;
  subscription: Subscription;
  authenticateModel:FormGroup;
  //finger Print
  // fingerprint:any;
  imageSource;
  scanned=false;

  base64FingerPrint:any;
  fingerType:any =  [];


  constructor(
    private stewardService: StewardService<any, any>,
    private notify: Notify,
    private fb: FormBuilder,
    protected router: Router,
    private sanitizer:DomSanitizer,
    private route: ActivatedRoute) {
    this.model = new AuthenticateModel();
    this.subscription = new Subscription();

   }


  ngOnInit() {
    for (const key in Fingers)
    {
        this.fingerType.push({number: key, word: Fingers[key]});
    }
    console.log(this.fingerType);
    this.authenticateModel=this.fb.group({
      idNumber:['',Validators.required],
      fingerPrint:['',Validators.required],
      transactionId:['',Validators.required],
      fingerType:['',Validators.required]

    })

  }
  scanFingerPrint(){
    this.stewardService.getFingerPrint('http://localhost:8080/launchmso').subscribe((response) => {
      if (response.payload) {
        this.scanned=true;
        this.imageSource =this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/bmp;base64,${response.payload}`);
        this.base64FingerPrint = response.payload;

        this.authenticateModel.patchValue({
          fingerPrint:this.base64FingerPrint
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
  onAuthenticate(form: NgForm){
    const inst = this;

    this.model.authenticateTransaction=this.authenticateModel.value;
    this.model.authenticateTransaction.idNumber=this.authenticateModel.value.idNumber;
    this.model.authenticateTransaction.transactionId=this.authenticateModel.value.transactionId;
    this.model.authenticateTransaction.fingerPrint=this.authenticateModel.value.fingerPrint;
    console.log(">>>>>>>>>>",this.model);
    this.stewardService.post('fortis/rest/v2/services/fortis_AuthenticateTransactionService/AuthenticateTransaction',  this.model).subscribe((response) => {
      if (response.code === 200 || response.code == 410) {
          inst.notify.showSuccess(response.message);
          this.router.navigate(['home/reports/authentication-report']);
      } else {
        inst.notify.showWarning(response.message)
      }
  }, error => {
    inst.notify.showWarning(error.error.message);
  });
}


}

import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';

import { Subscription } from 'rxjs';

import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { PaymentModel } from '../../../../entities/payment-provider-model';
import { StewardService } from '../../../../shared/services/steward/steward.service';
import { Notify } from '../../../../shared/class/notify';

@Component({
  selector: 'app-create-customer-fees',
  templateUrl: './create-customer-fees.component.html',
  styleUrls: ['./create-customer-fees.component.scss']
})
export class CreateCustomerFeesComponent implements OnInit, OnDestroy {
  model: PaymentModel;
  subscription: Subscription;
  isUpdate: boolean;
  isReadOnly = false;
  disabled = false;
  isView = false;
  customers= [];
  

  constructor(
    private stewardService: StewardService<any, any>,
    private notify: Notify,
    protected router: Router,
    private route: ActivatedRoute) {
    this.model = new PaymentModel();
    this.subscription = new Subscription();
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id'] != null) {
        this.fetchData(params['id']);
        this.isView = true;
        this.disabled = true;
        this.isReadOnly = true;
      }
    });
    this.subscription.add( 
      this.stewardService.get('customer?size=200').subscribe((response) => {
        if (response.code === 200) {
          this.customers = response.data.content;
          console.log('customer >>>>>>>>>>>++++++++',this.customers);
          
        } else {
          this.notify.showWarning(response.message);
        }
      })
    );

   
  }

  private fetchData(id: number) {
    const inst = this;
    inst.subscription.add(
      this.stewardService.get('customer-charge/' + id).subscribe((response) => {
        if (response.code === 200) {
          inst.model = response.data;
        } else {
          inst.notify.showWarning(response.message);
        }
      })
    );
    

  }

  @HostListener('window:beforeunload')
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
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

  onCreateForm(createForm: NgForm) {
    const inst = this;
    if (this.isUpdate) {
      this.stewardService.put('customer-charge', this.model).subscribe((response) => {
        console.log(response);
        if (response.code === 200) {
          inst.notify.showSuccess(response.message);
          this.router.navigate(['home/system-config/customer-fees-charges']);
        } else {
          inst.notify.showWarning(response.message);
        }
      }, error => {
        console.log(error);
        inst.notify.showWarning(error.error.message);
      });
    } else {
      this.stewardService.post('customer-charge', this.model).subscribe((response) => {
        console.log(response);
        if (response.code === 201) {
          inst.notify.showSuccess(response.message);
          this.router.navigate(['home/system-config/customer-fees-charges']);
        } else {
          inst.notify.showWarning(response.message);
        }
      }, error => {
        console.log(error);
        inst.notify.showWarning(error.error.message);
      });
    }

  }
  

}

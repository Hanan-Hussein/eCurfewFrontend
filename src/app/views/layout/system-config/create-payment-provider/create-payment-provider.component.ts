import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';

import { Subscription } from 'rxjs';

import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { PaymentModel } from '../../../../entities/payment-provider-model';
import { StewardService } from '../../../../shared/services/steward/steward.service';
import { Notify } from '../../../../shared/class/notify';


@Component({
  selector: 'app-create-payment-provider',
  templateUrl: './create-payment-provider.component.html',
  styleUrls: ['./create-payment-provider.component.css']
})
export class CreatePaymentProviderComponent implements OnInit, OnDestroy {
  model: PaymentModel;
  subscription: Subscription;
  isUpdate: boolean;
  isReadOnly = false;
  disabled = false;
  isView = false;
  countries= [];
  currencyies = [];

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
      this.stewardService.get('countries?size=200').subscribe((response) => {
        if (response.code === 200) {
          this.countries = response.data.content;
          console.log('countries >>>>>>>>>>>++++++++',this.countries);
          
        } else {
          this.notify.showWarning(response.message);
        }
      })
    );

    this.subscription.add( 
      this.stewardService.get('currency?size=200').subscribe((response) => {
        if (response.code === 200) {
          this.currencyies = response.data.content;
          console.log('currency >>>>>>>>>>>------',this.currencyies);
          
        } else {
          this.notify.showWarning(response.message);
        }
      })
    );
  }

  private fetchData(id: number) {
    const inst = this;
    inst.subscription.add(
      this.stewardService.get('payment-provider/' + id).subscribe((response) => {
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
      this.stewardService.put('payment-provider', this.model).subscribe((response) => {
        console.log(response);
        if (response.code === 200) {
          inst.notify.showSuccess(response.message);
          this.router.navigate(['home/system-config/providers']);
        } else {
          inst.notify.showWarning(response.message);
        }
      }, error => {
        console.log(error);
        inst.notify.showWarning(error.error.message);
      });
    } else {
      this.stewardService.post('payment-provider', this.model).subscribe((response) => {
        console.log(response);
        if (response.code === 201) {
          inst.notify.showSuccess(response.message);
          this.router.navigate(['home/system-config/providers']);
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



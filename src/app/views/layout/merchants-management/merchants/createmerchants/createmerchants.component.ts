import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { MerchantsModel } from '../../../../../entities/merchants-model';
import { Subscription } from 'rxjs';
import { StewardService } from '../../../../../shared/services/steward/steward.service';
import { Notify } from '../../../../../shared/class/notify';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-createmerchants',
  templateUrl: './createmerchants.component.html',
  styleUrls: ['./createmerchants.component.css']
})
export class CreatemerchantsComponent implements OnInit, OnDestroy {
  model: MerchantsModel;
  subscription: Subscription;
  isUpdate: boolean;
  isReadOnly = false;
  disabled = false;
  isView = false;
  countries= [];
  banks=[];
  branches=[];

  constructor(
    private stewardService: StewardService<any, any>,
    private notify: Notify,
    protected router: Router,
    private route: ActivatedRoute) {
    this.model = new MerchantsModel();
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
          
        } else {
          this.notify.showWarning(response.message);
        }
      })
    );

    this.subscription.add( 
      this.stewardService.get('bank?size=5000').subscribe((response) => {
        if (response.code === 200) {
          this.banks = response.data.content;
         
          
          
        } else {
          this.notify.showWarning(response.message);
        }
      })
    );

    this.subscription.add( 
      this.stewardService.get('bank-branch?size=5000').subscribe((response) => {
        if (response.code === 200) {
          this.branches = response.data.content;
          
          
        } else {
          this.notify.showWarning(response.message);
        }
      })
    );
  }

  private fetchData(id: number) {
    const inst = this;
    inst.subscription.add(
      this.stewardService.get('merchant/' + id).subscribe((response) => {
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
      this.stewardService.put('merchant', this.model).subscribe((response) => {
        console.log(response);
        if (response.code === 200) {
          inst.notify.showSuccess(response.message);
          this.router.navigate(['home/merchants-management/merchants']);
        } else {
          inst.notify.showWarning(response.message);
        }
      }, error => {
        console.log(error);
        inst.notify.showWarning(error.error.message);
      });
    } else {
      this.stewardService.post('merchant', this.model).subscribe((response) => {
        console.log(response);
        if (response.code === 201) {
          inst.notify.showSuccess(response.message);
          this.router.navigate(['home/merchants-management/merchants']);
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

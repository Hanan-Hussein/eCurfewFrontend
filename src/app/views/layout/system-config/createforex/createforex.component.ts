import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';

import { Subscription } from 'rxjs';

import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ForexModel } from '../../../../entities/forex-model';
import { StewardService } from '../../../../shared/services/steward/steward.service';
import { Notify } from '../../../../shared/class/notify';


@Component({
  selector: 'app-createforex',
  templateUrl: './createforex.component.html',
  styleUrls: ['./createforex.component.css']
})
export class CreateforexComponent implements OnInit, OnDestroy {
  model: ForexModel;
  subscription: Subscription;
  isUpdate: boolean;
  isReadOnly = false;
  disabled = false;
  isView = false;
  currencies= [];

  constructor(
    private stewardService: StewardService<any, any>,
    private notify: Notify,
    protected router: Router,
    private route: ActivatedRoute) {
    this.model = new ForexModel();
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
  }

  private fetchData(id: number) {
    const inst = this;
    inst.subscription.add(
      this.stewardService.get('forex/' + id).subscribe((response) => {
        if (response.code === 200) {
          inst.model = response.data;
        } else {
          inst.notify.showWarning(response.message);
        }
      })
    );
    this.subscription.add( 
      this.stewardService.get('currency').subscribe((response) => {
        if (response.code === 200) {
          this.currencies = response.data.content;
          console.log('currency >>>>>>>>>>>++++++++',this.currencies);
          
        } else {
          this.notify.showWarning(response.message);
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
      this.stewardService.put('forex', this.model).subscribe((response) => {
        console.log(response);
        if (response.code === 200) {
          inst.notify.showSuccess(response.message);
          this.router.navigate(['/home/system-config/forexs']);
        } else {
          inst.notify.showWarning(response.message);
        }
      }, error => {
        console.log(error);
        inst.notify.showWarning(error.error.message);
      });
    } else {
      this.stewardService.post('forex', this.model).subscribe((response) => {
        console.log(response);
        if (response.code === 201) {
          inst.notify.showSuccess(response.message);
          this.router.navigate(['/home/system-config/forexs']);
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


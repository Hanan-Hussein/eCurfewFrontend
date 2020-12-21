import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {StewardService} from '../../../../../shared/services/steward/steward.service';
import {Notify} from '../../../../../shared/class/notify';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {IndustryModel} from '../../../../../entities/industry-model';
import { Output } from '@angular/core';

@Component({
  selector: 'app-add-customer-status',
  templateUrl: './add-customer-status.component.html',
  styleUrls: ['./add-customer-status.component.scss']
})
export class AddCustomerStatusComponent implements OnInit {

  model: IndustryModel;
  subscription: Subscription;
  isUpdate: boolean;
  isReadOnly = false;
  disabled = false;
  isView = false;
  @Output() id: string;

  constructor(
    private stewardService: StewardService<any, any>,
    private notify: Notify,
    protected router: Router,
    private route: ActivatedRoute) {
    this.model = new IndustryModel();
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
      this.stewardService.getMasterData('fortis/rest/v2/entities/fortis_CustomerStatus/' + id).subscribe((response) => {
        if (response) {
          this.model.code=response.code;
          this.model.description=response.description;
          this.id=response.id;

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
      this.stewardService.put('fortis/rest/v2/entities/fortis_CustomerStatus/'+this.id, this.model).subscribe((response) => {
        console.log(response);
        if (response) {
          inst.notify.showSuccess(response.message);
          this.router.navigate(['home/master-data/customer-status']);
        } else {
          inst.notify.showWarning(response.message);
        }
      }, error => {
        console.log(error);
        inst.notify.showWarning(error.error.message);
      });
    } else {
      this.stewardService.post('fortis/rest/v2/services/fortis_MessageService/messageCustomerStatus',{user:this.model}).subscribe((response) => {
        console.log(response);
        if (response.code === 200) {
          inst.notify.showSuccess(response.message);
          this.router.navigate(['home/master-data/customer-status']);
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


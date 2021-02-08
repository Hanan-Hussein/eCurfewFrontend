import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {CustomerModel} from '../../../../entities/customer-model';
import {Subscription} from 'rxjs';
import {StewardService} from '../../../../shared/services/steward/steward.service';
import {Notify} from '../../../../shared/class/notify';
import {ActivatedRoute, Router} from '@angular/router';
import {FormArray, FormBuilder, FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import { Output } from '@angular/core';

@Component({
  selector: 'app-view-customer',
  templateUrl: './view-customer.component.html',
  styleUrls: ['./view-customer.component.scss']
})
export class ViewCustomerComponent implements OnInit, OnDestroy {
  model: CustomerModel;
  addresses = [];
  isReadOnly = true;
  disabled = true;
  isUpdate: boolean;
  subscription: Subscription;
  public customerForm: FormGroup;
  public addressForm: FormGroup;
  @Output() id: string;
  constructor(private stewardService: StewardService<any, any>, private notify: Notify,
              protected router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder) {
    this.model = new CustomerModel();
    this.subscription = new Subscription();
  }

  ngOnInit() {
    const inst = this;
    this.route.params.subscribe(params => {
      if (params['id'] != null) {
        this.fetchCustomer(params['id']);
      }
    });

    this.customerForm = new FormGroup({
      action: new FormControl()
    });
  }

  @HostListener('window:beforeunload')
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }


  fetchCustomer(id: number) {
    const params: Map<any, string> = new Map();
    const inst = this;
    inst.subscription.add(
      this.stewardService.get('fortis/rest/v2/entities/fortis_CustomerDetails/' + id, params).subscribe((response) => {
        if (response) {
          console.log(response.id);
          inst.model.surname = response.surname;
          this.model.mobileNumber=response.mobileNumber;
          this.model.idNumber=response.idNumber;
          this.model.firstName=response.firstName;
          this.model.occupation=response.occupation;
          this.model.employeeNumber=response.employeeNumber;
          this.model.kraPin=response.kraPin;
          this.model.emailAddress=response.emailAddress;
          this.model.currentAddress=response.currentAddress;
          this.model.nextofkinname=response.nextofkinname;
          this.model.nextofkinrelationship=response.nextofkinrelationship;
          this.model.nextofkinaddress=response.nextofkinaddress;
          this.model.nextofkinmobileNumber=response.nextofkinmobileNumber;
          this.model.nextofkinoccupation=response.nextofkinoccupation;

          this.id = response.id;

        } else {
          inst.notify.showWarning(response.message);
        }
      })
    );
  }


  enableUpdate() {
    this.isReadOnly = false;
    this.isUpdate = !this.isUpdate;

  }

  disableUpdate() {
    this.isReadOnly = true;
    this.isUpdate = !this.isUpdate;
  }

  onUpdate() {
    const params: Map<any, string> = new Map();
    const inst = this;

        this.stewardService.put('fortis/rest/v2/update/customer/'+this.id ,this.model).subscribe((response) => {
          if (response) {
            inst.notify.showSuccess(response.message);
            this.router.navigate(['home/customers/customers']);
          } else {
            inst.notify.showWarning(response.message);
          }
        }, error => {
          inst.notify.showWarning(error.error.message);
        });
    }
  }



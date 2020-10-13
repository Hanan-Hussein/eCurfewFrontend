// import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
// import {CustomerModel} from '../../../../entities/customer-model';
// import {Subscription} from 'rxjs';
// import {StewardService} from '../../../../shared/services/steward/steward.service';
// import {Notify} from '../../../../shared/class/notify';
// import {ActivatedRoute, Router} from '@angular/router';
// import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';

// @Component({
//   selector: 'app-view-customer',
//   templateUrl: './view-customer.component.html',
//   styleUrls: ['./view-customer.component.scss']
// })
// export class ViewCustomerComponent implements OnInit, OnDestroy {
//   model: CustomerModel;
//   addresses = [];
//   isReadOnly = true;
//   disabled = true;
//   isUpdate: boolean;
//   subscription: Subscription;
//   public customerForm: FormGroup;
//   public addressForm: FormGroup;
//   lat: number;
//   lng: number;
//   constructor(private stewardService: StewardService<any, any>, private notify: Notify,
//               protected router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder) {
//     this.model = new CustomerModel();
//     this.subscription = new Subscription();
//   }

//   ngOnInit() {
//     const inst = this;
//     this.route.params.subscribe(params => {
//       if (params['id'] != null) {
//         this.fetchCustomer(params['id']);
//       }
//     });
//     this.customerForm = this.formBuilder.group({
//       name: ['', [Validators.required]],
//       phoneNumber: ['', [Validators.required]],
//       tapAddressCollection: this.formBuilder.array([]),
//     });
//     this.addressForm = this.formBuilder.group({
//       lat: ['', [Validators.required]],
//       lng: ['', [Validators.required]],
//       moreInfo: ['', [Validators.required]],
//     });
//     this.stewardService.get('api/v1/address').subscribe((response) => {
//       if (response.code === 200) {
//         inst.addresses = response.data.content;
//       } else {
//         inst.notify.showWarning(response.message);
//       }
//     });
//   }

//   @HostListener('window:beforeunload')
//   ngOnDestroy(): void {
//     if (this.subscription) {
//       this.subscription.unsubscribe();
//     }
//   }

//   get f() {
//     return this.customerForm.controls;
//   }

//   // get product form controls
//   get address() {
//     return this.addressForm.controls;
//   }

//   fetchCustomer(id: number) {
//     const params: Map<any, string> = new Map();
//     const inst = this;
//     inst.subscription.add(
//       this.stewardService.getNoToken('api/v1/customer/' + id, params).subscribe((response) => {
//         if (response.code === 200) {
//           inst.model = response.data;
//           this.customerForm.get('name').setValue(this.model.name);
//           this.customerForm.get('phoneNumber').setValue(this.model.phoneNumber);
//           // mapping address controls to address collection data
//           const addressControl = <FormArray>this.customerForm.controls.tapAddressCollection;
//           this.model.tapAddressCollection.forEach(item => {
//             console.log('items', item);
//             // JSON.parse(item.lat);
//             // JSON.parse(item.lng);
//             addressControl.push(this.formBuilder.group(item));
//           });
//         } else {
//           inst.notify.showWarning(response.message);
//         }
//       })
//     );
//   }

//   get addressInfoForm() {
//     return this.customerForm.get('tapAddressCollection') as FormArray;
//   }

//   enableUpdate() {
//     this.isReadOnly = false;
//     this.isUpdate = !this.isUpdate;

//   }

//   disableUpdate() {
//     this.isReadOnly = true;
//     this.isUpdate = !this.isUpdate;
//   }

//   onUpdate() {}

// }

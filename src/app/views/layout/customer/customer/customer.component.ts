import { Component, OnInit } from '@angular/core';
import {DatatableColumns} from '../../../../entities/datatable/datatable-columns';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {
  cols: Array<DatatableColumns>;
  endpoint = 'customer';
  routeView = 'home/customers/customers/{0}/view-customer';
  hasCheckBox = true;
  idColumn = 'id';
  params: Map<any, string>;

  constructor() {
    this.cols = [];
    this.params = new Map();
    this.params.set('sort', 'id,desc');
  }

  ngOnInit() {
    this.cols.push({
      isCheckBox: true,
      title: '',
      data: 'id'
    });
    this.cols.push({
      title: 'Name',
      data: 'name'
    });
    this.cols.push({
      title: 'Credit Balance',
      data: 'creditBalance'
    });
    this.cols.push({
      title: 'Total Bought Credits',
      data: 'totalBoughtCredit'
    });
    this.cols.push({
      title: 'merchant',
      data: 'merchant.name'
    });
    this.cols.push({
      title: 'Phone Number',
      data: 'customerMobile'
    });
    this.cols.push({
      title: 'Email',
      data: 'email'
    });
    this.cols.push({
      title: 'Country',
      data: 'country'
    });
    this.cols.push({
      title: 'Date Created',
      data: 'creationDate',
      isDate: true
    });
    this.cols.push({
      title: 'Status',
      data: 'actionStatus'
    });
    this.cols.push({
      data: 'id',
      title: 'View',
      isViewMore: true,
    });
  }

}

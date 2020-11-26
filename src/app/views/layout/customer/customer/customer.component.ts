import { Component, OnInit } from '@angular/core';
import {DatatableColumns} from '../../../../entities/datatable/datatable-columns';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {
  cols: Array<DatatableColumns>;
  endpoint = 'fortis/rest/v2/entities/fortis_CustomerDetails?limit=10&offset=0&returnCount=true';
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
      title: ' First Name',
      data: 'firstName'
    });
    this.cols.push({
      title: 'SurName',
      data: 'surname'
    });
    this.cols.push({
      title: 'Employee Number',
      data: 'employeeNumber'
    });
    this.cols.push({
      title: 'Id Number',
      data: 'idNumber'
    });
    this.cols.push({
      title: 'Email Address',
      data: 'emailAddress'
    });
    this.cols.push({
      title: 'Occupation',
      data: 'occupation'
    });

    this.cols.push({
      title: 'Action Status',
      data: 'actionStatus'
    });
    this.cols.push({
      data: 'id',
      title: 'View',
      isViewMore: true,
    });
  }

}

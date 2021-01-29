import { Component, OnInit } from '@angular/core';
import {DatatableColumns} from '../../../../entities/datatable/datatable-columns';

@Component({
  selector: 'app-approve-customer',
  templateUrl: './approve-customer.component.html',
  styleUrls: ['./approve-customer.component.css']
})
export class ApproveCustomerComponent implements OnInit {
  cols: Array<DatatableColumns>;
  endpoint = 'fortis/rest/v2/entities/fortis_CustomerDetails/search?filter=%7B%22conditions%22%3A%20%5B%7B%22property%22%3A%20%22actionStatus%22%2C%22operator%22%3A%20%22%3D%22%2C%22value%22%3A%20%22UNAPPROVED%22%20%7D%5D%7D&view=customerReport&returnCount=true&sort=-createTs';
  routeView = 'home/customers/customers/{0}/view-customer';
  hasCheckBox = true;
  idColumn = 'id';
  params: Map<any, string>;

  constructor() {
    this.cols = [];
    this.params = new Map();
    // this.params.set('sort', 'id,desc');
    // this.params.set('actionStatus', 'Unapproved');
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
      title: 'Action Status',
      data: 'actionStatus'
    });
  }

}

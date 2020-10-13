import { Component, OnInit } from '@angular/core';
import {DatatableColumns} from '../../../../entities/datatable/datatable-columns';

@Component({
  selector: 'app-payment-provider',
  templateUrl: './payment-provider.component.html',
  styleUrls: ['./payment-provider.component.css']
})
export class PaymentProviderComponent implements OnInit {
  cols: Array<DatatableColumns>;
  endpoint = 'payment-provider';
  routeView = 'home/system-config/providers/{0}/view-provider';
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
      title: 'Country',
      data: 'country'
    });
    this.cols.push({
      title: 'Currency',
      data: 'currency'
    });
    this.cols.push({
      title: 'Account Type',
      data: 'accountType'
    });
    
    this.cols.push({
      title: 'Account Number',
      data: 'accountNumber'
    });
    this.cols.push({
      title: 'Gateway Url',
      data: 'gatewayUrl'
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

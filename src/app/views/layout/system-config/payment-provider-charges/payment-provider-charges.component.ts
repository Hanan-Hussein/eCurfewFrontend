import { Component, OnInit } from '@angular/core';
import {DatatableColumns} from '../../../../entities/datatable/datatable-columns';

@Component({
  selector: 'app-payment-provider-charges',
  templateUrl: './payment-provider-charges.component.html',
  styleUrls: ['./payment-provider-charges.component.css']
})
export class PaymentProviderChargesComponent implements OnInit {
  cols: Array<DatatableColumns>;
  endpoint = 'provider-charge';
  routeView = 'home/system-config/providers-charges/{0}/view-provider';
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
      title: 'Payment Provider',
      data: 'paymentProvider.name'
    });
    this.cols.push({
      title: 'Payment Provider Charge Type',
      data: 'chargeType'
    });
    this.cols.push({
      title: 'Value',
      data: 'value'
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

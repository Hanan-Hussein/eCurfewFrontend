import { Component, OnInit } from '@angular/core';
import {DatatableColumns} from '../../../../entities/datatable/datatable-columns';

@Component({
  selector: 'app-approve-payment-provider',
  templateUrl: './approve-payment-provider.component.html',
  styleUrls: ['./approve-payment-provider.component.css']
})
export class ApprovePaymentProviderComponent implements OnInit {
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
    this.params.set('actionStatus', 'Unapproved');
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

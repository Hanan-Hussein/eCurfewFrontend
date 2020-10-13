import { Component, OnInit } from '@angular/core';
import {DatatableColumns} from '../../../../entities/datatable/datatable-columns';

@Component({
  selector: 'app-merchant-fees',
  templateUrl: './merchant-fees.component.html',
  styleUrls: ['./merchant-fees.component.scss']
})
export class MerchantFeesComponent implements OnInit {
  cols: Array<DatatableColumns>;
  endpoint = 'merchant-charge';
  routeView = 'home/system-config/merchant-fees-charges/{0}/view-provider';
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
      title: 'Merchant',
      data: 'merchant.name'
    });
    this.cols.push({
      title: 'Merchant Fee Type',
      data: 'merchantFeeType'
    });
    this.cols.push({
      title: 'Value',
      data: 'value'
    });
    this.cols.push({
      title: 'Charge Type',
      data: 'chargeType'
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

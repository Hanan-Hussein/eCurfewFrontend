import { Component, OnInit } from '@angular/core';
import {DatatableColumns} from '../../../../entities/datatable/datatable-columns';

@Component({
  selector: 'app-approve-customer-fees',
  templateUrl: './approve-customer-fees.component.html',
  styleUrls: ['./approve-customer-fees.component.scss']
})
export class ApproveCustomerFeesComponent implements OnInit {
  cols: Array<DatatableColumns>;
  endpoint = 'customer-charge';
  routeView = 'home/system-config/customer-fees-charges/{0}/view-provider';
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
      title: 'Customer',
      data: 'customer.name'
    });
    this.cols.push({
      title: 'Customer Transaction',
      data: 'customerTransaction'
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

import { Component, OnInit } from '@angular/core';
import {DatatableColumns} from '../../../../../entities/datatable/datatable-columns';

@Component({
  selector: 'app-approve-merchants',
  templateUrl: './approve-merchants.component.html',
  styleUrls: ['./approve-merchants.component.css']
})
export class ApproveMerchantsComponent implements OnInit {cols: Array<DatatableColumns>;
  endpoint = 'merchant';
  hasCheckBox = true;
  idColumn = 'id';
  params: Map<any, string>;
  routeView = '/home/merchants-management/merchants/{0}/view-merchant';

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
      data: 'id',
    });
    this.cols.push({
      title: 'Merchant Name',
      data: 'name'
    });
    this.cols.push({
      title: 'Email',
      data: 'email',
    });
    this.cols.push({
      title: 'Phone Number',
      data: 'phone'
    });
    this.cols.push({
      title: 'BankName',
      data: 'bankName'
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
      title: 'View',
      data: 'id',
      isViewMore: true
    });

  }

}

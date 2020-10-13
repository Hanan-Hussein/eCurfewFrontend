import { Component, OnInit } from '@angular/core';
import {DatatableColumns} from '../../../../../entities/datatable/datatable-columns';

@Component({
  selector: 'app-approve-currency',
  templateUrl: './approve-currency.component.html',
  styleUrls: ['./approve-currency.component.scss']
})
export class ApproveCurrencyComponent implements OnInit {
  cols: Array<DatatableColumns>;
  endpoint = 'currency';
  routeView = 'home/master-data/currency/{0}/view-currency';
  hasCheckBox = true;
  idColumn = 'id';
  params: Map<any, string>;

  constructor() {
    this.cols = [];
    this.params = new Map();
    this.params.set('sort', 'name,asc');
    this.params.set('actionStatus', 'Unapproved');
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
      title: 'Code',
      data: 'code'
    });
    this.cols.push({
      title: 'Code Name',
      data: 'codeName'
    });
    this.cols.push({
      title: 'Symbol',
      data: 'symbol'
    });
    this.cols.push({
      title: 'Decimal Value',
      data: 'decimalValue'
    });
    this.cols.push({
      title: 'Numeric Value',
      data: 'numericValue'
    });
    this.cols.push({
      title: 'Date Created',
      data: 'createdAt',
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

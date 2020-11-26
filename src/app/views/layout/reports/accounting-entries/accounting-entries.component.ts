import { Component, OnInit } from '@angular/core';
import {DatatableColumns} from '../../../../entities/datatable/datatable-columns';

@Component({
  selector: 'app-accounting-entries',
  templateUrl: './accounting-entries.component.html',
  styleUrls: ['./accounting-entries.component.scss']
})
export class AccountingEntriesComponent implements OnInit {

  cols: Array<DatatableColumns>;
  endpoint = 'accounting-reports?limit=20&returnCount=true';
  hasCheckBox = false;
  idColumn = 'id';
  params: Map<any, string>;
  routeView = 'home/reports/accounting-entries/{0}/view';


  constructor() {
    this.cols = [];
    this.params = new Map();
    this.params.set('sort', 'createdAt,desc');

  }

  ngOnInit() {
    this.cols.push({
      title: 'Reference Number',
      data: 'referenceNumber'
    });
    this.cols.push({
      title: 'Account',
      data: 'account'
    });
    this.cols.push({
      title: 'Credit Amount',
      data: 'credit'
    });
    this.cols.push({
      title: 'Debit Amount',
      data: 'debit'
    });

    this.cols.push({
      title: 'Codes',
      data: 'referenceNumber'
    });
    this.cols.push({
      title: 'Currency',
      data: 'debit'
    });
    this.cols.push({
      title: 'Description',
      data: 'description'
    });

    this.cols.push({
      title: 'Date',
      data: 'createdAt',
      isDate: true
    });

  }

}

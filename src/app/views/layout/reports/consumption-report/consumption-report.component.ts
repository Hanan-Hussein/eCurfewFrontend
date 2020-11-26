import { Component, OnInit } from '@angular/core';
import {DatatableColumns} from '../../../../entities/datatable/datatable-columns';

@Component({
  selector: 'app-consumption-report',
  templateUrl: './consumption-report.component.html',
  styleUrls: ['./consumption-report.component.scss']
})
export class ConsumptionReportComponent implements OnInit {

  cols: Array<DatatableColumns>;
  endpoint = 'consumption-reports?limit=20&returnCount=true';
  hasCheckBox = false;
  idColumn = 'id';
  params: Map<any, string>;
  routeView = 'home/reports/consumption-reports/{0}/view';


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
      title: 'Name',
      data: 'name'
    });
    this.cols.push({
      title: 'Debit',
      data: 'debit'
    });
    this.cols.push({
      title: 'Balance',
      data: 'balance'
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

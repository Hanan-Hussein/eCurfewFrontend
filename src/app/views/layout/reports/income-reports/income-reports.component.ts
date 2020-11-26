import { Component, OnInit } from '@angular/core';
import {DatatableColumns} from '../../../../entities/datatable/datatable-columns';

@Component({
  selector: 'app-income-reports',
  templateUrl: './income-reports.component.html',
  styleUrls: ['./income-reports.component.scss']
})
export class IncomeReportsComponent implements OnInit {

  cols: Array<DatatableColumns>;
  endpoint = 'income-report?limit=20&returnCount=true';
  hasCheckBox = false;
  idColumn = 'id';
  params: Map<any, string>;
  routeView = 'home/reports/income-reports/{0}/view';


  constructor() {
    this.cols = [];
    this.params = new Map();
    this.params.set('sort', 'id,desc');
  }

  ngOnInit() {
    this.cols.push({
      title: 'Name',
      data: 'name'
    });
    this.cols.push({
      title: 'Income Today',
      data: 'incomeToday'
    });
    this.cols.push({
      title: 'Income To Date',
      data: 'incomeToDate'
    });
    this.cols.push({
      title: 'charges',
      data: 'incomeToDate'
    });
    this.cols.push({
      title: 'collections',
      data: 'incomeToDate'
    });
    this.cols.push({
      title: 'balance',
      data: 'incomeToDate'
    });


  }

}

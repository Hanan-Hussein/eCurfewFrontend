import { Component, OnInit } from '@angular/core';
import {DatatableColumns} from '../../../../entities/datatable/datatable-columns';

@Component({
  selector: 'app-top-up-requests',
  templateUrl: './top-up-requests.component.html',
  styleUrls: ['./top-up-requests.component.scss']
})
export class TopUpRequestsComponent implements OnInit {

  cols: Array<DatatableColumns>;
  endpoint = 'top-up-reports';
  hasCheckBox = false;
  idColumn = 'id';
  params: Map<any, string>;
  routeView = 'home/reports/top-up-reports/{0}/view';


  constructor() {
    this.cols = [];
    this.params = new Map();
    this.params.set('sort', 'id,desc');
  }

  ngOnInit() {
    this.cols.push({
      title: 'Transaction Id',
      data: 'transactionId'
    });
    this.cols.push({
      title: 'Customer Name',
      data: 'customerName'
    });
    this.cols.push({
      title: 'Merchant Name',
      data: 'merchantName'
    });
    this.cols.push({
      title: 'Amount',
      data: 'amount'
    });
    this.cols.push({
      title: 'Credits Awarded',
      data: 'creditsAwarded'
    });
    this.cols.push({
      title: 'Status',
      data: 'status'
    });
    this.cols.push({
      title: 'Currency',
      data: 'currency'
    });
    this.cols.push({
      title: 'PaymentProvider',
      data: 'paymentProvider'
    });
    this.cols.push({
      title: 'Date',
      data: 'createTs',
      isDate: true
    });
    
  }

}

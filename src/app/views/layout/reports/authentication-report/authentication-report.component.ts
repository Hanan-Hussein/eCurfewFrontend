import { Component, OnInit } from '@angular/core';
import {DatatableColumns} from '../../../../entities/datatable/datatable-columns';

@Component({
  selector: 'app-authentication-report',
  templateUrl: './authentication-report.component.html',
  styleUrls: ['./authentication-report.component.scss']
})
export class AuthenticationReportComponent implements OnInit {
  cols: Array<DatatableColumns>;
  endpoint = 'fortis/rest/v2/entities/fortis_CustomerAuthentication/?view=customerAuthentication-view&returnCount=true';
  hasCheckBox = false;
  idColumn = 'id';
  params: Map<any, string>;
  routeView = 'home/reports/audit-logs/{0}/view';

  constructor() {
    this.cols = [];
    this.params = new Map();
    this.params.set('sort', 'id,desc');
   }

  ngOnInit() {
    this.cols.push({
      title: 'First Name',
      data: 'customer.firstName'
    });
    this.cols.push({
      title: 'Sur Name',
      data: 'customer.surname'
    });
    this.cols.push({
      title: 'Id Number',
      data: 'customer.idNumber'
    });
    this.cols.push({
      title: 'Transaction Id',
      data: 'transactionId'
    });
    this.cols.push({
      title: 'Result',
      data: 'result',
      // isDate: true
    });

    this.cols.push({
      title: 'Score',
      data: 'score'
    });
    this.cols.push({
      title: 'Authenticated Date',
      data: 'createTs',
      isDate: true
    });

    // this.cols.push({
    //   title: 'View More',
    //   data: 'id',
    //   isViewMore: true
    // });
  }

}


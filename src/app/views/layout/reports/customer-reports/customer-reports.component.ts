import { Component, OnInit } from '@angular/core';
import {DatatableColumns} from "../../../../entities/datatable/datatable-columns";

@Component({
  selector: 'app-customer-reports',
  templateUrl: './customer-reports.component.html',
  styleUrls: ['./customer-reports.component.scss']
})
export class CustomerReportsComponent implements OnInit {
  cols: Array<DatatableColumns>;
  endpoint = 'fortis/rest/v2/entities/fortis_FortisUser/search?filter=%7B%22conditions%22%3A%20%5B%7B%22property%22%3A%20%22active%22%2C%22operator%22%3A%20%22%3D%22%2C%22value%22%3A%20true%7D%5D%7D&returnCount=true&view=maker-checker-view';
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
      title: 'National Id',
      data: 'nationalId'
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


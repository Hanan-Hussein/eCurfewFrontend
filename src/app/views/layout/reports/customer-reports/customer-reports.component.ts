import { Component, OnInit } from '@angular/core';
import {DatatableColumns} from "../../../../entities/datatable/datatable-columns";

@Component({
  selector: 'app-customer-reports',
  templateUrl: './customer-reports.component.html',
  styleUrls: ['./customer-reports.component.scss']
})
export class CustomerReportsComponent implements OnInit {
  cols: Array<DatatableColumns>;
  endpoint = 'fortis/rest/v2/entities/fortis_CustomerDetails?view=customerReport&returnCount=true&sort=-createTs';
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
      data: 'firstName'
    });
    this.cols.push({
      title: 'Sur Name',
      data: 'surname'
    });
    this.cols.push({
      title: 'Other Name',
      data: 'otherNames'
    });
    this.cols.push({
      title: 'National Id',
      data: 'idNumber'
    });
    this.cols.push({
      title: 'Action Status',
      data: 'actionStatus'
    });
    this.cols.push({
      title: 'Created By',
      data: 'createdBy',
    });
    this.cols.push({
      title: 'Approved By',
      data: 'approvedBy',
    });
    this.cols.push({
      title: 'Created Date',
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


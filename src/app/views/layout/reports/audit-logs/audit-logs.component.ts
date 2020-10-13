// @ts-ignore
import {Component, OnInit} from '@angular/core';
import {DatatableColumns} from '../../../../entities/datatable/datatable-columns';

// @ts-ignore
@Component({
  selector: 'app-audit-logs',
  templateUrl: './audit-logs.component.html',
  styleUrls: ['./audit-logs.component.scss']
})
export class AuditLogsComponent implements OnInit {

  cols: Array<DatatableColumns>;
  endpoint = 'audit-log';
  hasCheckBox = false;
  idColumn = 'logId';
  params: Map<any, string>;
  routeView = 'home/reports/audit-logs/{0}/view';


  constructor() {
    this.cols = [];
    this.params = new Map();
    this.params.set('sort', 'logId,desc');
  }

  ngOnInit() {
    this.cols.push({
      title: 'Activity Type',
      data: 'activityType'
    });
    this.cols.push({
      title: 'Occurence Time',
      data: 'occurenceTime',
      isDate: true
    });
    this.cols.push({
      title: 'Status',
      data: 'status'
    });
    this.cols.push({
      title: 'Entity',
      data: 'entityName'
    });
    this.cols.push({
      title: 'IP Address',
      data: 'ipAddress'
    });
    this.cols.push({
      title: 'User',
      data: 'userId.fullName'
    });

    this.cols.push({
      title: 'View More',
      data: 'logId',
      isViewMore: true
    });
  }

}

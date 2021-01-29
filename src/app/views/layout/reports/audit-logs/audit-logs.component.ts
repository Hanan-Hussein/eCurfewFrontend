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
  endpoint = 'fortis/rest/v2/entities/sec$EntityLog/?view=audit-view&returnCount=true&sort=-eventTs';
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
      title: 'Activity Type',
      data: 'type'
    });
    this.cols.push({
      title: 'Occurence Time',
      data: 'eventTs',
      isDate: true
    });

    this.cols.push({
      title: 'Entity',
      data: 'user._entityName'
    });

    this.cols.push({
      title: 'Username',
      data: 'user.login'
    });


    // this.cols.push({
    //   title: 'View More',
    //   data: 'id',
    //   isViewMore: true
    // });
  }

}

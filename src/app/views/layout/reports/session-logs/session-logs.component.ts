import { Component, OnInit } from '@angular/core';
import {DatatableColumns} from '../../../../entities/datatable/datatable-columns';

@Component({
  selector: 'app-session-logs',
  templateUrl: './session-logs.component.html',
  styleUrls: ['./session-logs.component.scss']
})
export class SessionLogsComponent implements OnInit {

  cols: Array<DatatableColumns>;
  endpoint = 'app/rest/v2/entities/sec$SessionLogEntry?returnCount=true&sort=-finishedTs&view=sessionLogEntry-view1';
  hasCheckBox = true;
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
      isCheckBox: true,
      title: '',
      data: 'id'
      });
    this.cols.push({
      title: 'Last Action',
      data: 'lastAction'
    });
    this.cols.push({
      title: 'Ip address',
      data: 'address'
    });
    this.cols.push({
      title: 'Username',
      data: 'user.login'
    });
    this.cols.push({
      title: 'Started Ts',
      data: 'startedTs',
      isDate: true

    });
    this.cols.push({
      title: 'Finished Ts',
      data: 'finishedTs',
      isDate: true,
    });
    // this.cols.push({
    //   title: 'Client Info',
    //   data: 'clientInfo'
    // });
    // this.cols.push({
    //   title: 'User',
    //   data: 'userId.fullName'
    // });

    // this.cols.push({
    //   title: 'View More',
    //   data: 'id',
    //   isViewMore: true
    // });
  }

}

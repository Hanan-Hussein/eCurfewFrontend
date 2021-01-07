import { Component, OnInit } from '@angular/core';
import {DatatableColumns} from "../../../../entities/datatable/datatable-columns";

@Component({
  selector: 'app-user-report',
  templateUrl: './user-report.component.html',
  styleUrls: ['./user-report.component.scss']
})
export class UserReportComponent implements OnInit {
  cols: Array<DatatableColumns>;
  endpoint = 'fortis/rest/v2/entities/fortis_FortisUser/search?filter=%7B%0A%20%20%20%20%22conditions%22%3A%20%5B%0A%20%20%20%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%22group%22%3A%20%22OR%22%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%22conditions%22%3A%20%5B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%22property%22%3A%20%22actionStatus%22%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%22operator%22%3A%20%22%3D%22%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%22value%22%3A%20%22APPROVED%22%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%22property%22%3A%20%22actionStatus%22%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%22operator%22%3A%20%22%3D%22%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%22value%22%3A%20%22UNAPPROVED%22%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%20%20%20%20%5D%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%5D%0A%7D&returnCount=true&view=maker-checker-view';
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
      title: 'Last Name',
      data: 'lastName'
    });
    this.cols.push({
      title: 'National Id',
      data: 'nationalId'
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


import { Component, OnInit } from '@angular/core';
import {DatatableColumns} from '../../../../../entities/datatable/datatable-columns';

@Component({
  selector: 'app-approve-customer-status',
  templateUrl: './approve-customer-status.component.html',
  styleUrls: ['./approve-customer-status.component.scss']
})
export class ApproveCustomerStatusComponent implements OnInit {
  cols: Array<DatatableColumns>;
  endpoint = 'fortis/rest/v2/entities/fortis_CustomerStatus/search?filter=%7B%22conditions%22%3A%20%5B%7B%22property%22%3A%20%22actionStatus%22%2C%22operator%22%3A%20%22%3D%22%2C%22value%22%3A%20%22UNAPPROVED%22%20%7D%5D%7D&returnCount=true';
  hasCheckBox = true;
  idColumn = 'id';
  params: Map<any, string>;
  routeView = '/home/user-management/users/{0}/view-user';
  constructor() {
    this.cols = [];
    this.params = new Map();
    this.params.set('sort', 'id');
    // this.params.set('actionStatus', 'Unapproved');
  }

  ngOnInit() {
    this.cols.push({
      isCheckBox: true,
      title: '',
      data: 'id'
    });
    this.cols.push({
      title: 'Entity Name',
      data: '_entityName'
    });

    this.cols.push({
      title: 'Code',
      data: 'code'
    });
    this.cols.push({
      title: 'Name',
      data: 'description'
    });
    this.cols.push({
      title: 'Status',
      data: 'actionStatus'
    });
    this.cols.push({
      data: 'id',
      title: 'View',
      isViewMore: true,
    });
  }

}



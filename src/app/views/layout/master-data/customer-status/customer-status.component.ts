import { Component, OnInit } from '@angular/core';
import {DatatableColumns} from '../../../../entities/datatable/datatable-columns';

@Component({
  selector: 'app-customer-status',
  templateUrl: './customer-status.component.html',
  styleUrls: ['./customer-status.component.scss']
})
export class CustomerStatusComponent implements OnInit {
  cols: Array<DatatableColumns>;
  endpoint = 'fortis/rest/v2/entities/fortis_CustomerStatus?returnCount=true&view=customerStatus-view&sort=-createTs';
  routeView = 'home/master-data/customer-status/{0}/view-customer-status';
  hasCheckBox = true;
  idColumn = 'id';
  params: Map<any, string>;

  constructor() {
    this.cols = [];
    this.params = new Map();
    this.params.set('sort', 'code,asc');
  }
ngOnInit() {
  this.cols.push({
    isCheckBox: true,
    title: '',
    data: 'id'
    });
    // this.cols.push({
    // title: 'Entity Name',
    // data: '_entityName'
    // });

    this.cols.push({
    title: 'Code',
    data: 'code'
    });
    this.cols.push({
    title: 'Description',
    data: 'description'
    });
    this.cols.push({
      title: 'Created By',
      data: 'createdBy'
    });
    this.cols.push({
      title: 'Created at',
      data: 'createTs'
    });
    this.cols.push({
    data: 'id',
    title: 'View',
    isViewMore: true,
    });
    }

    }

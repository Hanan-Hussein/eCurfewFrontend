import { Component, OnInit } from '@angular/core';
import {DatatableColumns} from '../../../../../entities/datatable/datatable-columns';

@Component({
  selector: 'app-approve-country',
  templateUrl: './approve-country.component.html',
  styleUrls: ['./approve-country.component.scss']
})
export class ApproveCountryComponent implements OnInit {
  cols: Array<DatatableColumns>;
  endpoint = 'countries';
  routeView = 'home/master-data/countries/{0}/view-country';
  hasCheckBox = true;
  idColumn = 'id';
  params: Map<any, string>;

  constructor() {
    this.cols = [];
    this.params = new Map();
    this.params.set('sort', 'code,asc');
    this.params.set('actionStatus', 'Unapproved');
  }

  ngOnInit() {
    this.cols.push({
      isCheckBox: true,
      title: '',
      data: 'id'
    });
    this.cols.push({
      title: 'Name',
      data: 'name'
    });
    this.cols.push({
      title: 'Code',
      data: 'code'
    });
    this.cols.push({
      title: 'Date Created',
      data: 'createdAt',
      isDate: true
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

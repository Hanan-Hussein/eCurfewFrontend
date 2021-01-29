import {Component, OnInit} from '@angular/core';
import {DatatableColumns} from '../../../../entities/datatable/datatable-columns';
@Component({
  selector: 'app-account-officer',
  templateUrl: './account-officer.component.html',
  styleUrls: ['./account-officer.component.scss']
})
export class AccountOfficerComponent implements OnInit {
  cols: Array<DatatableColumns>;
  endpoint = 'fortis/rest/v2/entities/fortis_AccountOfficer?returnCount=true&view=accountOfficer-view&sort=-createTs';
  routeView = 'home/master-data/account-officer/{0}/view-account-officer';
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

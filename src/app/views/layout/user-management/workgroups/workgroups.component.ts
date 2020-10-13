import {Component, OnInit} from '@angular/core';
import {DatatableColumns} from '../../../../entities/datatable/datatable-columns';

@Component({
  selector: 'app-workgroups',
  templateUrl: './workgroups.component.html',
  styleUrls: ['./workgroups.component.scss']
})
export class WorkgroupsComponent implements OnInit {
  cols: Array<DatatableColumns>;
  endpoint = 'workgroup';
  hasCheckBox = true;
  idColumn = 'groupId';
  params: Map<any, string>;
  routeView = '/home/user-management/workgroups/{0}/view-workgroup';

  constructor() {
    this.cols = [];
    this.params = new Map();
    this.params.set('sort', 'groupId,desc');
  }

  ngOnInit() {
    this.cols.push({
      isCheckBox: true,
      title: '',
      data: 'groupId',
    });
    this.cols.push({
      title: 'Workgroup',
      data: 'groupName'
    });
    this.cols.push({
      title: 'Description',
      data: 'description',
    });
    this.cols.push({
      title: 'Date Created',
      data: 'createdOn',
      isDate: true
    });
    this.cols.push({
      title: 'Status',
      data: 'actionStatus'
    });
    this.cols.push({
      title: 'View',
      data: 'groupId',
      isViewMore: true
    });
  }

}

import {Component, OnInit} from '@angular/core';
import {DatatableColumns} from '../../../../entities/datatable/datatable-columns';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {
  cols: Array<DatatableColumns>;
  endpoint = 'role';
  hasCheckBox = true;
  idColumn = 'roleId';
  params: Map<any, string>;
  routeView = '/home/user-management/roles/{0}/view-role';

  constructor() {
    this.cols = [];
    this.params = new Map();
    this.params.set('sort', 'roleId,desc');
  }

  ngOnInit() {
    this.cols.push({
      isCheckBox: true,
      title: '',
      data: 'roleId',
    });
    this.cols.push({
      title: 'Role Name',
      data: 'roleName'
    });
    this.cols.push({
      title: 'Description',
      data: 'description',
    });
    this.cols.push({
      title: 'Date Created',
      data: 'creationDate',
      isDate: true
    });
    this.cols.push({
      title: 'Status',
      data: 'actionStatus'
    });
    this.cols.push({
      title: 'View',
      data: 'roleId',
      isViewMore: true
    });

  }

}

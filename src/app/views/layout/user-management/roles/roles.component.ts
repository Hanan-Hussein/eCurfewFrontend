import {Component, OnInit} from '@angular/core';
import {DatatableColumns} from '../../../../entities/datatable/datatable-columns';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {
  cols: Array<DatatableColumns>;
  endpoint = 'fortis/rest/v2/entities/sec$Role?returnCount=true';
  hasCheckBox = true;
  idColumn = 'roleId';
  params: Map<any, string>;
  routeView = '/home/user-management/roles/{0}/view-role';

  constructor() {
    this.cols = [];
    this.params = new Map();
    this.params.set('sort', 'id,desc');
  }

  ngOnInit() {
    this.cols.push({
      isCheckBox: true,
      title: '',
      data: 'id',
    });
    this.cols.push({
      title: 'Role Name',
      data: 'name'
    });
    this.cols.push({
      title: 'Security Scope',
      data: 'securityScope',
    });
    this.cols.push({
      title: 'Type',
      data: 'type',
    });

    this.cols.push({
      title: 'Local Security Scope',
      data: 'locSecurityScope',
    });
    this.cols.push({
      title: 'View',
      data: 'id',
      isViewMore: true
    });
  }

}

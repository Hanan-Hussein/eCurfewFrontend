import {Component, OnInit} from '@angular/core';
import {DatatableColumns} from '../../../../entities/datatable/datatable-columns';

@Component({
  selector: 'app-workgroups',
  templateUrl: './workgroups.component.html',
  styleUrls: ['./workgroups.component.scss']
})
export class WorkgroupsComponent implements OnInit {
  cols: Array<DatatableColumns>;
  endpoint = 'fortis/rest/v2/entities/fortis_WorkGroups/?view=workGroups-view&returnCount=true&sort=-createTs';
  hasCheckBox = true;
  idColumn = 'id';
  params: Map<any, string>;
  routeView = '/home/user-management/workgroups/{0}/view-workgroup';

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
      title: 'Workgroup',
      data: 'name'
    });
    this.cols.push({
      title: 'Description',
      data: 'description',
    });
    this.cols.push({
      title: 'Status',
      data: 'actionStatus'
    });
    this.cols.push({
      title: 'Action',
      data: 'action'
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
    this.cols.push({
      title: 'View',
      data: 'id',
      isViewMore: true
    });
  }

}

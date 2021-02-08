import {Component, OnInit} from '@angular/core';
import {DatatableColumns} from '../../../../../entities/datatable/datatable-columns';

@Component({
  selector: 'app-approve-workgroups',
  templateUrl: './approve-workgroups.component.html',
  styleUrls: ['./approve-workgroups.component.scss']
})
export class ApproveWorkgroupsComponent implements OnInit {
  cols: Array<DatatableColumns>;
  endpoint = 'fortis/rest/v2/entities/fortis_WorkGroups/search?filter=%7B%22conditions%22%3A%20%5B%7B%22property%22%3A%20%22actionStatus%22%2C%22operator%22%3A%20%22%3D%22%2C%22value%22%3A%20%22UNAPPROVED%22%20%7D%5D%7D&returnCount=true&sort=-createTs&view=workGroups-view';
  hasCheckBox = true;
  idColumn = 'id';
  params: Map<any, string>;
  routeView = '/home/user-management/workgroups/{0}/view-workgroup';


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

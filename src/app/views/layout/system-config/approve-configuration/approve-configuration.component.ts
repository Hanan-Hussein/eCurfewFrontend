import {Component, OnInit} from '@angular/core';
import {DatatableColumns} from '../../../../entities/datatable/datatable-columns';

@Component({
  selector: 'app-approve-configuration',
  templateUrl: './approve-configuration.component.html',
  styleUrls: ['./approve-configuration.component.scss']
})
export class ApproveConfigurationComponent implements OnInit {
  cols: Array<DatatableColumns>;
  endpoint = 'system-config';
  routeView = 'home/system-config/config/{0}/view-config';
  hasCheckBox = true;
  idColumn = 'id';
  params: Map<any, string>;

  constructor() {
    this.cols = [];
    this.params = new Map();
    this.params.set('sort', 'id,desc');
    this.params.set('actionStatus', 'Unapproved');
  }

  ngOnInit() {
    this.cols.push({
      isCheckBox: true,
      title: '',
      data: 'id'
    });
    this.cols.push({
      title: 'Entity',
      data: 'entity'
    });
    this.cols.push({
      title: 'Parameter',
      data: 'parameter'
    });
    this.cols.push({
      title: 'Value',
      data: 'value'
    });
    this.cols.push({
      title: 'Description',
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

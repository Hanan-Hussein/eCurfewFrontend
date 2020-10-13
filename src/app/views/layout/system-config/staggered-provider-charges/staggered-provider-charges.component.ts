import { Component, OnInit } from '@angular/core';
import {DatatableColumns} from '../../../../entities/datatable/datatable-columns';

@Component({
  selector: 'app-staggered-provider-charges',
  templateUrl: './staggered-provider-charges.component.html',
  styleUrls: ['./staggered-provider-charges.component.css']
})
export class StaggeredProviderChargesComponent implements OnInit {
  cols: Array<DatatableColumns>;
  endpoint = 'provider-staggered-charge';
  routeView = 'home/system-config/provider-staggered-charge/{0}/view-provider';
  hasCheckBox = true;
  idColumn = 'id';
  params: Map<any, string>;

  constructor() {
    this.cols = [];
    this.params = new Map();
    this.params.set('sort', 'id,desc');
  }

  ngOnInit() {
    this.cols.push({
      isCheckBox: true,
      title: '',
      data: 'id'
    });
    this.cols.push({
      title: 'chargeId',
      data: 'chargeId'
    });
    this.cols.push({
      title: 'from',
      data: 'from'
    });
    this.cols.push({
      title: 'to',
      data: 'to'
    });
    this.cols.push({
      title: 'value',
      data: 'value'
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

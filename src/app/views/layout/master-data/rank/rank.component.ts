import { Component, OnInit } from '@angular/core';
import {DatatableColumns} from '../../../../entities/datatable/datatable-columns';
@Component({
  selector: 'app-rank',
  templateUrl: './rank.component.html',
  styleUrls: ['./rank.component.scss']
})
export class RankComponent implements OnInit {
  cols: Array<DatatableColumns>;
  endpoint = 'app/rest/v2/entities/ecurfew_Rank?returnCount=true&view=rank-view&sort=-createTs';
  routeView = 'home/master-data/police-station/{0}/rank';
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
      this.cols.push({
      title: 'Rank Code',
      data: 'rankCode'
      });
      this.cols.push({
      title: 'Rank Name',
      data: 'rankName'
      });
      this.cols.push({
        title: 'Description',
        data: 'description'
        });
      this.cols.push({
        title: 'Created at',
        data: 'createTs',
        isDate: true
      });
      this.cols.push({
      data: 'id',
      title: 'View',
      isViewMore: true,
      });
      }

}

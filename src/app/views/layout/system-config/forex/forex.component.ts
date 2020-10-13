import { Component, OnInit } from '@angular/core';
import {DatatableColumns} from '../../../../entities/datatable/datatable-columns';

@Component({
  selector: 'app-forex',
  templateUrl: './forex.component.html',
  styleUrls: ['./forex.component.css']
})
export class ForexComponent implements OnInit {
  cols: Array<DatatableColumns>;
  endpoint = 'forex';
  hasCheckBox = true;
  idColumn = 'id';
  params: Map<any, string>;
  routeView = '/home/system-config/forexs/{0}/view-forex';

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
      title: 'Base Currency',
      data: 'baseCurrency'
    });
    this.cols.push({
      title: 'No of gaming credits per 1 currency amount',
      data: 'exchangeRate',
    });
   
    this.cols.push({
      title: 'View',
      data: 'id',
      isViewMore: true
    });

  }

}

import {Component, OnInit} from '@angular/core';
import {DatatableColumns} from '../../../../entities/datatable/datatable-columns';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss']
})
export class CountriesComponent implements OnInit {

  cols: Array<DatatableColumns>;
  endpoint = 'countries?limit=20&returnCount=true';
  routeView = 'home/master-data/countries/{0}/view-country';
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
      title: 'Name',
      data: 'name'
    });
    this.cols.push({
      title: 'Code',
      data: 'code'
    });
    this.cols.push({
      title: 'Date Created',
      data: 'createdAt',
      isDate: true
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
